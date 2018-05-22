import React, { Component } from 'react';
import { Button, ButtonIcon, InputIcon } from 'design-system-react';
import classNames from 'classnames';

import GroupMenuOption from './groupMenuOption';
import EventUtil from '../../../utilities/event';
import KeyCodes from '../../../utilities/key-codes';

class SuperSearchJumpRegions extends Component {
	constructor(props) {
		super(props);
		this.group1 = null;
		this.group2 = null;
		this.group3 = null;
		this.searchInput = null;

		this.state = {
			isOpen: false,
			activeIndex: null,
			activeGroup: 0,
			groupMenuOptions: [
				{ index: 0, label: "Golden Gate Bridge" },
				{ index: 2, label: "Golden Gate Park" },
				{ index: 1, label: "Ferry Building" },
				{ index: 4, label: "Fishermans Wharf" },
				{ index: 3, label: "Mission" },
				{ index: 5, label: "Pier 39" },
				{ index: 6, label: "Alcatraz" },
				{ index: 7, label: "Presidio" },
				{ index: 8, label: "Chrissy Field" },
				{ index: 9, label: "Oakland Museum of Modern Art" },
				{ index: 10, label: "SF MOMA" },
				{ index: 11, label: "Legion of Honor" },
				{ index: 12, label: "Sausalito" },
				{ index: 13, label: "Mt Tam" },
				{ index: 14, label: "Lake Merrit" },
				{ index: 15, label: "Grand Lake Farmers Market" },
				{ index: 16, label: "Jack London Square" },
				{ index: 17, label: "Sol Food" },
				{ index: 18, label: "Alamere Falls" },
				{ index: 19, label: "Embarcadero stroll" }
			]
		};
	}


	handleKeyUp = (e) => {
		EventUtil.trapEvent(e);
		if (e.keyCode === KeyCodes.DOWN) {
			console.log(this.state.activeIndex );
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
			if (this.state.activeIndex > 0) {
				this.setState((prevState, props) => ({
					activeIndex: prevState.activeIndex - 1
				}))
			}
		} else if (e.keyCode === KeyCodes.ESCAPE) {
			if (this.state.isOpen) {
				this.setState((prevState, props) => ({
					isOpen: false,
					activeIndex: null
				}), () => {
					this.searchInput.focus()
				})
			}
		} else if (e.keyCode === KeyCodes.RIGHT) {
			console.log('right');
			if(this.state.activeGroup < 3) {
				this.setState((prevState, props) => ({
					activeIndex: null,
					activeGroup: prevState.activeGroup + 1
				}))
			}
		} else if (e.keyCode === KeyCodes.LEFT) {
			console.log('left');
			if(this.state.activeGroup > 0) {
				this.setState((prevState, props) => ({
					activeIndex: null,
					activeGroup: prevState.activeGroup - 1
				}))
			}
		} else {
		console.log('key up');}
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
				className="group1 slds-col"
				role="listbox"
				ref={(component) => {
					if (this.state.activeGroup === 0 && this.state.activeIndex === null) {
						this.handleFocus(undefined, { ref: component })
					}
				}}
				tabIndex="-1"
			>
				<ul className="slds-listbox slds-listbox_vertical mh-dropdown" role="presentation">
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
			<div
				className="group2 slds-col slds-grid mh-dropdown"
				aria-label="Places"
				ref={(component) => {
					if (this.state.activeGroup === 1) {
						this.handleFocus(undefined, { ref: component })
					}
				}}
				tabIndex="-1"
			>
				<img src="./assets/images/googleMaps.png" alt="google maps placeholder" />
				<div>
				<a href="javascript:void(0)" className="db">Ferry Building</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				<a href="javascript:void(0)" className="db">More info</a>
				</div>
			</div>
		)
	}

	renderGroup3 () {
		return (
			<div
				className="group3 slds-col"
				aria-label="Dashboards"
				ref={(component) => {
					if (this.state.activeGroup === 2) {
						this.handleFocus(undefined, { ref: component })
					}
				}}
				tabIndex="-1"
			>
				<img src="./assets/images/chart.png" alt="Chart placeholder" />
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
			<div className="mtl slds-form-element">
				<h2 className="pbm">2. Super Search - Arrow key regions navigation</h2>
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
									ref={(component) => this.searchInput = component }
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

export default SuperSearchJumpRegions;
