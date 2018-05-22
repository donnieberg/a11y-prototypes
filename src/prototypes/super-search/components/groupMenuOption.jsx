import React, { Component } from 'react';

class GroupMenuOption extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render () {
		const {
			active,
			data,
			i,
			lastIndex,
			onRequestFocus
		} = this.props;

		return (
			<li role="presentation" className="slds-listbox__item">
				<div
					className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
					id={`option${i}`}
					ref={(component) => {
						if (active) {
							onRequestFocus(undefined, { ref: component });
						}
					}}
					role="option"
					tabIndex={lastIndex ? "0" : "-1" }>
					<span
						className="slds-truncate"
						title={data.label}>
						{ data.label }
					</span>
				</div>
			</li>
		)
	}
}

export default GroupMenuOption;

