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
			user,
			content
		} = this.props;

		return (
			<li>
				<article className="slds-comment slds-media slds-hint-parent">
					<div className="slds-media__figure">
						<a href="javascript:void(0);" className="slds-avatar slds-avatar_circle slds-avatar_medium">
							<img alt={user} src="./assets/images/avatar2.jpg" title={`${user} Avatar`} />
						</a>
					</div>
					<div className="slds-media__body">
						<header className="slds-media slds-media_center">
							<div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
								<p className="slds-truncate" title={user}><a href="javascript:void(0);">{user}</a></p>
								<ButtonIcon name="down" assistiveText="More Options" />
							</div>
						</header>
						<div className="slds-comment__content slds-text-longform">{content}</div>
						<footer>
							<ul className="slds-list_horizontal slds-has-dividers_right slds-text-body_small">
								<li className="slds-item">
									<button className="slds-button_reset slds-text-color_weak" title="Like this item" aria-pressed="false">Like</button>
								</li>
								<li className="slds-item">16hr Ago</li>
							</ul>
						</footer>
					</div>
				</article>
			</li>
		)
	}
}

export default FeedComment;
