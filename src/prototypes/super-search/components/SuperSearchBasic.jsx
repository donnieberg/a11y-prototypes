import React, { Component } from 'react';
import { Button, ButtonIcon, InputIcon } from 'design-system-react';
import classNames from 'classnames';

import GroupMenuOption from './groupMenuOption';
import EventUtil from '../../../utilities/event';
import KeyCodes from '../../../utilities/key-codes';

class SuperSearchOption1 extends Component {
	constructor(props) {
		super(props);
		this.group = null;

		this.state = {
			isOpen: false,
			activeIndex: null,
			groupMenuOptions: [
				{ index: 0, label: "Burlington Textiles Corp of America" },
				{ index: 1, label: "Dickenson plc" },
				{ index: 2, label: "Edge Communications" },
				{ index: 3, label: "Veribob corp" }
			]
		};
	}


	handleKeyUp = (e) => {
		EventUtil.trapEvent(e);
		if (e.keyCode === KeyCodes.DOWN) {
			if (this.state.activeIndex === null) {
				this.setState((prevState, props) => ({
					isOpen: true,
					activeIndex: 0
				}))
			} else if (this.state.activeIndex < this.state.groupMenuOptions.length - 1) {
				this.setState((prevState, props) => ({
					activeIndex: prevState.activeIndex + 1
				}))
			}
		} else if (e.keyCode === KeyCodes.UP) {
			console.log('up');
		} else {
		console.log('hi');}
	}

	handleFocus = (event, { ref }) => {
		if (ref) {
			this.activeItem = ref;
			this.activeItem.focus();
		}
	}

	renderGroup1 () {
		return (
			<div
				aria-label="Salesforce Accounts"
				className="slds-col"
				role="listbox"
			>
				<ul className="slds-listbox slds-listbox_vertical" role="presentation">
					{ this.state.groupMenuOptions.map((option, i) => {
						return (
							<GroupMenuOption
								active={this.state.activeIndex === i}
								data={option}
								i={i}
								key={i}
								lastIndex={i === this.state.groupMenuOptions.length - 1}
								onRequestFocus={this.handleFocus}
								onKeyUp={this.handleKeyUp}
							/>
						)
					}) }
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
			<div
				className="slds-dropdown slds-dropdown_length-10 slds-dropdown_fluid"
				id="listbox-id-10"
				onKeyUp={this.handleKeyUp}
				role="dialog"
			>
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
				<h2 className="pbm">1. Super Search - Basic Tab navigation</h2>
				<label className="slds-form-element__label f3" htmlFor="combobox-id-13">Relate to</label>
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

export default SuperSearchOption1;
