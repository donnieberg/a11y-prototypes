import React, { Component } from 'react';
import classNames from 'classnames';
import RadioButtonGroup from 'design-system-react/components/radio-button-group';
import Radio from 'design-system-react/components/radio-button-group/radio';

class TextOnImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blur: '4px',
			border: { width: '1px', style: 'solid', color: '#000'},
			fontWeight: '300',
			fontSize: '22.5px',
			hex: '#000',
			horizontal: '0px',
			image: 'darkCloudsImage',
			textColor: '#fff',
			vertical: '0px'
		};
	}

	handleInputChange = (e) => {
		const newStateObj = {};
		newStateObj[e.target.id] = e.target.value
		this.setState( newStateObj);
	}

	renderImageOptions () {
		const images = [
			{ label: 'dark', value: 'darkCloudsImage'},
			{ label: 'periwinkle', value: 'lightCloudsImage'},
			{ label: 'bright blue', value: 'lightCloudsImage2'}
		];

		const labels = { label: 'Select Background Image' };

		return (
			<RadioButtonGroup
				labels={labels}
				onChange={(event) => this.setState({
					image: event.target.value,
					textColor: event.target.value === 'darkCloudsImage' ? '#fff' : '#000',
					hex: event.target.value === 'darkCloudsImage' ? '#000' : '#fff'
				})}
			>
				{images.map((image) => <Radio
					checked={this.state.image === image.value}
					id={image.value}
					key={image.value}
					label={image.label}
					value={image.value}
					variant="button-group" />)}
			</RadioButtonGroup>
		)
	}

	render() {
		const headingStyle = {
			'color': this.state.textColor,
			'fontWeight': this.state.fontWeight,
			'fontSize': this.state.fontSize,
			'textShadow': `${this.state.horizontal} ${this.state.vertical} ${this.state.blur} ${this.state.hex}`
		};

		return (
			<div className="df df-start">
				<aside>
					<h1 className="f4 fw-bold caps pvm">Edit Text Shadow</h1>
					<ul>
						<li className="pvs">
							<div className="slds-form-element">
								{this.renderImageOptions()}
							</div>
						</li>
						<li className="pvs">
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
						<li className="pvs">
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
						<li className="pvs">
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
						<li className="pvs">
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
					<ul className="mtm">
						<h1 className="f4 fw-bold caps pvm">Edit Font Values</h1>
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
					</ul>
				</aside>
				<main className="df df-start">
					<div>
						<h1 className="f4 fw-bold caps tac pvm">Live Demo Component</h1>
						<section className="mlx slds-popover slds-popover_walkthrough slds-nubbin_left" role="dialog" aria-labelledby="dialog-heading-id-01" aria-describedby="dialog-body-id-11">
							<button className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon-inverse" title="Close dialog">
								<svg className="slds-button__icon" aria-hidden="true">
									<use xlinkHref="./assets/icons/utility-sprite/svg/symbols.svg#close" />
								</svg>
								<span className="slds-assistive-text">Close dialog</span>
							</button>
							<header className={classNames("slds-p-vertical_medium", {
								"slds-popover__header": this.state.image === "darkCloudsImage",
								"header_backgroundLightClouds": this.state.image === "lightCloudsImage",
								"header_backgroundLightClouds2": this.state.image === "lightCloudsImage2"
							})}>
							<h2 id="dialog-heading-id-01" className="slds-text-heading_medium" style={headingStyle}>Manage your channels</h2>
						</header>
						<div className="slds-popover__body" id="dialog-body-id-11">
							<p className="f5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<footer className="slds-popover__footer">
							<div className="slds-grid slds-grid_vertical-align-center">
								<span className="slds-text-title">Step 2 of 4</span>
								<button className="slds-button slds-button_brand slds-col_bump-left">Next</button>
							</div>
						</footer>
					</section>
				</div>
				<div>
					<h1 className="f4 fw-bold caps tac pvm">Original</h1>
					<section className="mlx slds-popover slds-popover_walkthrough slds-nubbin_left" role="dialog" aria-labelledby="dialog-heading-id-02" aria-describedby="dialog-body-id-12">
						<button className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon-inverse" title="Close dialog">
							<svg className="slds-button__icon" aria-hidden="true">
								<use xlinkHref="./assets/icons/utility-sprite/svg/symbols.svg#close" />
							</svg>
							<span className="slds-assistive-text">Close dialog</span>
						</button>
						<header className={classNames("slds-p-vertical_medium", {
								"slds-popover__header": this.state.image === "darkCloudsImage",
								"header_backgroundLightClouds": this.state.image === "lightCloudsImage",
								"header_backgroundLightClouds2": this.state.image === "lightCloudsImage2"
							})} style={{ color: this.state.textColor }}>
							<h2 id="dialog-heading-id-01" className="slds-text-heading_medium">Manage your channels</h2>
						</header>
						<div className="slds-popover__body" id="dialog-body-id-11">
							<p className="f5">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						</div>
						<footer className="slds-popover__footer">
							<div className="slds-grid slds-grid_vertical-align-center">
								<span className="slds-text-title">Step 2 of 4</span>
								<button className="slds-button slds-button_brand slds-col_bump-left">Next</button>
							</div>
						</footer>
					</section>
				</div>
			</main>
		</div>
		);
	}
}

export default TextOnImages;
