import React, { Component } from 'react';
import classNames from 'classnames';

class LiveExample extends Component {
	render() {
		const headingStyle = {
			'color': this.props.textColor,
			'fontWeight': this.props.fontWeight,
			'fontSize': this.props.fontSize,
			'textShadow': `${this.props.horizontal} ${this.props.vertical} ${this.props.blur} ${this.props.hex}`
		};

		const maskStyle = {
			'background': this.props.gradient !== "" ? `linear-gradient(${this.props.gradient})` : 'none'
		};

		return (
			<div>
				<h1 className="f4 fw-bold caps tac pvm">Live Demo Component</h1>
				<section className="demo mlx slds-popover slds-popover_walkthrough slds-nubbin_left" role="dialog" aria-labelledby="dialog-heading-id-01" aria-describedby="dialog-body-id-11">
					<button className="slds-button slds-button_icon slds-button_icon-small slds-float_right slds-popover__close slds-button_icon-inverse" title="Close dialog">
						<svg className="slds-button__icon" aria-hidden="true">
							<use xlinkHref="./assets/icons/utility-sprite/svg/symbols.svg#close" />
						</svg>
						<span className="slds-assistive-text">Close dialog</span>
					</button>
					<header className={classNames({
						"slds-popover__header": this.props.image === "darkCloudsImage",
						"header_backgroundLightClouds": this.props.image === "lightCloudsImage",
						"header_backgroundLightClouds2": this.props.image === "lightCloudsImage2"
					})} style={{ height: this.props.imageSize === 'medium' ? '8rem': 'auto'}}>
					<div className={classNames("ht-inherit", {
						"df df-center": this.props.textPosition === 'center',
						"df df-top": this.props.textPosition === 'top',
						"df df-bottom": this.props.textPosition === 'bottom'
					})}
					style={maskStyle}>
					<h2 id="dialog-heading-id-01" className="slds-text-heading_medium" style={headingStyle}>Manage your channels</h2>
				</div>
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
		)
	}
}

export default LiveExample;
