import React, { Component } from 'react';
import { ButtonIcon } from 'design-system-react';

class FeedComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="slds-feed__item-comments">
				<div className="slds-p-horizontal_medium slds-p-vertical_x-small slds-grid">
					<button className="slds-button_reset slds-text-link">More comments</button>
					<span className="slds-text-body_small slds-col_bump-left">1 of 8</span>
				</div>
				<ul>
					<li>
						<article className="slds-comment slds-media slds-hint-parent">
							<div className="slds-media__figure">
								<a href="javascript:void(0);" className="slds-avatar slds-avatar_circle slds-avatar_medium">
									<img alt="Jenna Davis" src="/assets/images/avatar2.jpg" title="Jenna Davis avatar" />
								</a>
							</div>
							<div className="slds-media__body">
								<header className="slds-media slds-media_center">
									<div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
										<p className="slds-truncate" title="Jenna Davis"><a href="javascript:void(0);">Jenna Davis</a></p>
										<ButtonIcon name="down" assistiveText="More Options" />
									</div>
								</header>
								<div className="slds-comment__content slds-text-longform">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
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
				</ul>
			</div>
		)
	}
}

export default FeedComment;
