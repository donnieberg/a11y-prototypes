import React, { Component } from 'react';
import { Button, ButtonIcon } from 'design-system-react';

class FeedComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const {
			active,
			content,
			events,
			handleKeyUp,
			i,
			postIndex,
			totalComments,
			user,
		} = this.props;

		return (
			<article
				aria-describedby={`feedPost${postIndex}-feedComment${i}-label3`}
				aria-labelledby={`feedPost${postIndex}-feedComment${i}-label1 feedPost${postIndex}-feedComment${i}-label2`}
				aria-posinset={i + 1}
				aria-setsize={totalComments}
				className="slds-comment slds-media slds-hint-parent"
				data-type="feedComment"
				onKeyUp={handleKeyUp}
				ref={(component) => {
					if (active) {
						events.onRequestFocus(undefined, { ref: component });
					}
				}}
				tabIndex="0"
			>
				<div className="slds-media__figure">
					<a href="javascript:void(0);" className="slds-avatar slds-avatar_circle slds-avatar_medium">
						<img alt={user} src="./assets/images/avatar2.jpg" title={`${user} Avatar`} />
					</a>
				</div>
				<div className="slds-media__body">
					<header className="slds-media slds-media_center">
						<div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
							<p id={`feedPost${postIndex}-feedComment${i}-label1`} className="slds-truncate" title={user}><a href="javascript:void(0);">{user}</a></p>
							<ButtonIcon name="down" assistiveText="More Options" />
						</div>
					</header>
					<div id={`feedPost${postIndex}-feedComment${i}-label3`} className="slds-comment__content slds-text-longform">{content}</div>
					<footer>
						<ul className="slds-list_horizontal slds-has-dividers_right slds-text-body_small">
							<li className="slds-item">
								<button className="slds-button_reset slds-text-color_weak" title="Like this item" aria-pressed="false">Like</button>
							</li>
							<li id={`feedPost${postIndex}-feedComment${i}-label2`} className="slds-item">16hr Ago</li>
						</ul>
					</footer>
				</div>
			</article>
		)
	}
}

export default FeedComment;
