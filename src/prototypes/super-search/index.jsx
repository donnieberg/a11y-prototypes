import React, { Component } from 'react';
import { Button, ButtonIcon, InputIcon } from 'design-system-react';
import classNames from 'classnames';

import EventUtil from '../../utilities/event';
import KeyCodes from '../../utilities/key-codes';

class SuperSearch extends Component {
	constructor(props) {
		super(props);
		this.group = null;

		this.state = {
			isOpen: false
		};
	}

	handleKeyUp = (e) => {
		EventUtil.trapEvent(e);
		if (e.keyCode === KeyCodes.DOWN) {
			this.setState({
				isOpen: true
			}, () => {
				this.group.focus()
			})
		} else if (e.keyCode === KeyCodes.UP) {
			console.log('up');
		} else {
		console.log('hi');}
	}

	renderGroup1 () {
		return (
			<div
				className="slds-col"
				role="listbox"
				aria-label="Salesforce Accounts"
				tabIndex="0"
				ref={(component) => this.group = component}
			>
				<ul className="slds-listbox slds-listbox_vertical" role="presentation">
					<li role="presentation" className="slds-listbox__item">
						<div id="option1" className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
							<span className="slds-truncate" title="Burlington Textiles Corp of America"> Burlington Textiles Corp of America</span>
						</div>
					</li>
					<li role="presentation" className="slds-listbox__item">
						<div id="option2" className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
							<span className="slds-truncate" title="Dickenson plc"> Dickenson plc</span>
						</div>
					</li>
					<li role="presentation" className="slds-listbox__item">
						<div id="option3" className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
							<span className="slds-truncate" title="Edge Communications"> Edge Communications</span>
						</div>
					</li>
				</ul>
			</div>
		)
	}

	renderGroup2 () {
		return (
			<div className="slds-col" aria-label="Places">
				<img src="/assets/images/googleMaps.png" alt="google maps placeholder" />
				<a href="javascript:void(0)">Ferry Building</a>
			</div>
		)
	}

	renderGroup3 () {
		return (
			<div className="slds-col" aria-label="Dashboards">
				<img src="/assets/images/chart.png" alt="Chart placeholder" />
				<a href="javascript:void(0)">Chart</a>
			</div>
		)
	}

	renderDialog () {
		return (
			<div id="listbox-id-10" className="slds-dropdown slds-dropdown_length-10 slds-dropdown_fluid" role="dialog">
				<div className="slds-grid">
					{ this.renderGroup1() }
					{ this.renderGroup2() }
					{ this.renderGroup3() }
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="slds-form-element">
				<label className="slds-form-element__label" htmlFor="combobox-id-13">Relate to</label>
				<div className="slds-form-element__control">
					<div className="slds-combobox_container">
						<div className="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open" aria-expanded="true" aria-haspopup="listbox" role="combobox">
							<div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
								<input
									aria-autocomplete="list"
									aria-controls="listbox-id-10"
									autoComplete="off"
									className="slds-input slds-combobox__input slds-has-focus"
									id="combobox-id-13"
									onKeyUp={this.handleKeyUp}
									placeholder="Search..."
									role="textbox"
									type="text"
								/>
								<InputIcon name="search" />
							</div>
							{this.state.isOpen ? this.renderDialog() : null}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SuperSearch;
