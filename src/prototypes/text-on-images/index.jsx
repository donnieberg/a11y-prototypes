import React, { Component } from 'react';
import classNames from 'classnames';
import RadioButtonGroup from 'design-system-react/components/radio-button-group';
import Radio from 'design-system-react/components/radio-button-group/radio';

import StaticExample from './components/static-example';
import LiveExample from './components/live-example';

class TextOnImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blur: '4px',
			border: { width: '1px', style: 'solid', color: '#000'},
			fontWeight: '400',
			fontSize: '22.5px',
			gradient: `0deg, hsla(0, 0%, 0%, 0.8) 0%, hsla(0, 0%, 0%, 0.738) 19%, hsla(0, 0%, 0%, 0.541) 34%, hsla(0, 0%, 0%, 0.382) 47%, hsla(0, 0%, 0%, 0.278) 56.5%, hsla(0, 0%, 0%, 0.194) 65%, hsla(0, 0%, 0%, 0.126) 73%, hsla(0, 0%, 0%, 0.075) 80.2%, hsla(0, 0%, 0%, 0.042) 86.1%, hsla(0, 0%, 0%, 0.021) 91%, hsla(0, 0%, 0%, 0.008) 95.2%, hsla(0, 0%, 0%, 0.002) 98.2%, hsla(0, 0%, 0%, 0) 100%`,
			hex: '#000',
			horizontal: '0px',
			image: 'darkCloudsImage',
			imageSize: 'small',
			textColor: '#fff',
			textPosition: 'center',
			vertical: '0px'
		};
	}

	handleInputChange = (e) => {
		const newStateObj = {};
		newStateObj[e.target.id] = e.target.value
		this.setState( newStateObj);
	}

	handleGradientChange = (event) => {
		let color, hex;
		if (event.target.value == "" && this.state.image !== 'darkCloudsImage') {
			color = '#000';
			hex = '#fff';
		} else {
			color = '#fff';
			hex = '#000';
		}
		this.setState({
			gradient: event.target.value,
			textColor: color,
			hex: hex
		})
	}

	renderImageOptions () {
		const images = [
			{ label: 'dark', value: 'darkCloudsImage'},
			{ label: 'periwinkle', value: 'lightCloudsImage'},
			{ label: 'bright blue', value: 'lightCloudsImage2'}
		];

		const imageSizes = [
			{ label: 'small', value: 'small'},
			{ label: 'medium', value: 'medium'}
		];

		const labels = { label: 'Select Background Image' };

		return (
			<fieldset className="slds-form-element">
				<div className="dib">
					<legend className="slds-form-element__legend slds-form-element__label">Image</legend>
					<div className="slds-form-element__control">
						{	images.map((image) => <Radio
							checked={this.state.image === image.value}
							id={image.value}
							key={image.value}
							label={image.label}
							onChange={(event) => {
								let color, hex;
								if (event.target.value !== 'darkCloudsImage' && this.state.gradient === "") {
									color = '#000';
									hex = '#fff';
								} else {
									color = '#fff';
									hex = '#000';
								}
								this.setState({
									image: event.target.value,
									textColor: color,
									hex: hex
								})
							}}
								value={image.value}
						/>)
						}
					</div>
				</div>
				<div className="dib mll">
					<legend className="ptm slds-form-element__legend slds-form-element__label">Image Size</legend>
					<div className="slds-form-element__control">
						{	imageSizes.map((size) => <Radio
							checked={this.state.imageSize === size.value}
							id={size.value}
							key={size.value}
							label={size.label}
							onChange={(event) => this.setState({
								imageSize: event.target.value,
							})}
							value={size.value}
						/>)
						}
					</div>
				</div>
			</fieldset>
		)
	}

	render() {
		return (
			<div className="df df-start">
				<section>
				<aside>
					<div className="pvs">
						<h1 className="f5 fw-bold caps pvm">Edit Cloud Image</h1>
						<div className="slds-form-element">
							{this.renderImageOptions()}
						</div>
					</div>
					<div className="pvs">
						<h1 className="f5 fw-bold caps ptm">Edit Header Position</h1>
						<div className="slds-form-element">
							<label className="slds-form-element__label slds-assistive-text" htmlFor="textPosition">Header Position</label>
							<div className="slds-form-element__control">
								<select id="textPosition" onChange={this.handleInputChange} placeholder="Select position" value={this.state.textPosition}>
									<option value="top">top</option>
									<option value="center">center</option>
									<option value="bottom">bottom</option>
								</select>
							</div>
						</div>
					</div>
					<div className="pvs">
						<h1 className="f5 fw-bold caps pvm">Edit Gradient Mask</h1>
						<button className="slds-button slds-button_brand f5 mvs" onClick={() => this.setState({ gradient: ''})}>Clear Gradient</button>
						<div className="slds-form-element">
							<textarea
								className="slds-input"
								id="gradient"
								onChange={this.handleGradientChange}
								placeholder="Enter in linear gradient"
								type="text"
								value={this.state.gradient}
							/>
						</div>
					</div>
					<h1 className="f5 fw-bold caps ptl">Edit Text Shadow</h1>
					<ul>
						<li className="dib pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="horizontal">Horizontal Shadow</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="horizontal"
										onChange={this.handleInputChange}
										placeholder="Enter in px value"
										type="text"
										value={this.state.horizontal}
									/>
								</div>
							</div>
						</li>
						<li className="dib pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="vertical">Vertical Shadow</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="vertical"
										onChange={this.handleInputChange}
										placeholder="Enter in px value"
										type="text"
										value={this.state.vertical}
									/>
								</div>
							</div>
						</li>
						<li className="dib pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="blur">Blur Shadow</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="blur"
										onChange={this.handleInputChange}
										placeholder="Enter in px value"
										type="text"
										value={this.state.blur}
									/>
								</div>
							</div>
						</li>
						<li className="dib pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="hex">Text Shadow Color (Hex Value)</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="hex"
										onChange={this.handleInputChange}
										placeholder="Enter in Hex value"
										type="text"
										value={this.state.hex}
									/>
								</div>
							</div>
						</li>
					</ul>
					<ul className="form-width">
						<h1 className="f5 fw-bold caps ptl">Edit Font Values</h1>
						<li className="pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="textColor">Text Color (Hex Value)</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="textColor"
										onChange={this.handleInputChange}
										placeholder="Enter in Hex value"
										type="text"
										value={this.state.textColor}
									/>
								</div>
							</div>
						</li>
						<li className="pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="fontSize">Font Size</label>
								<div className="slds-form-element__control">
									<input
										className="slds-input"
										id="fontSize"
										onChange={this.handleInputChange}
										placeholder="Enter in # value"
										type="text"
										value={this.state.fontSize}
									/>
								</div>
							</div>
						</li>
						<li className="pvs">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="fontWeight">Font Weight</label>
								<div className="slds-form-element__control">
									<select id="fontWeight" onChange={this.handleInputChange} placeholder="Enter in # value" value={this.state.fontWeight}>
										<option value="100">100</option>
										<option value="200">200</option>
										<option value="300">300</option>
										<option value="400">400</option>
										<option value="500">500</option>
										<option value="600">600</option>
										<option value="700">700</option>
										<option value="800">800</option>
										<option value="900">900</option>
									</select>
								</div>
							</div>
						</li>
					</ul>
				</aside>
				</section>
				<main className="df df-start">
				<LiveExample
					blur={this.state.blur}
					fontSize={this.state.fontSize}
					fontWeight={this.state.fontWeight}
					gradient={this.state.gradient}
					hex={this.state.hex}
					horizontal={this.state.horizontal}
					image={this.state.image}
					imageSize={this.state.imageSize}
					textColor={this.state.textColor}
					textPosition={this.state.textPosition}
					vertical={this.state.vertical}
				/>
				<StaticExample
					image={this.state.image}
					imageSize={this.state.imageSize}
					textColor={this.state.textColor}
					textPosition={this.state.textPosition}
				/>
			</main>
		</div>
		);
	}
}

export default TextOnImages;
