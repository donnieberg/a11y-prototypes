import React, { Component } from 'react';
import { ButtonIcon } from 'design-system-react';

class FeedPost extends Component {
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
			totalPosts,
			user,
		} = this.props;

		return (
			<article
				aria-describedby={`feedItem${i}-label2 feedItem${i}-label3`}
				aria-labelledby={`feedItem${i}-label1`}
				aria-posinset={i + 1}
				aria-setsize={totalPosts}
				className="slds-post"
				data-type="feedPost"
				onKeyUp={handleKeyUp}
				ref={(component) => {
					if (active) {
						events.onRequestFocus(undefined, { ref: component });
					}
				}}
				tabIndex={i === 0 ? "0" : "-1"}
			>
				<header className="slds-post__header slds-media">
					<div className="slds-media__figure">
						<a href="javascript:void(0);" className="slds-avatar slds-avatar_circle slds-avatar_large">
							<img alt={user} src="./assets/images/avatar1.jpg" title={`${user} avatar`} />
						</a>
					</div>
					<div className="slds-media__body">
						<div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
							<p id={`feedItem${i}-label1`}><a href="javascript:void(0);" title={user}>{user}</a> — <a href="javascript:void(0);" title="Design Systems">Design Systems</a></p>
							<ButtonIcon name="down" assistiveText="More Options" />
						</div>
						<p id={`feedItem${i}-label2`} className="slds-text-body_small"><a href="javascript:void(0);" title="Click for single-item view of this post" className="slds-text-link_reset">5 days Ago</a></p>
					</div>
				</header>
				<div className="slds-post__content slds-text-longform">
					<p id={`feedItem${i}-label3`}>{content}</p>
				</div>
				<footer className="slds-post__footer">
					<ul className="slds-post__footer-actions-list slds-list_horizontal">
						<li className="slds-col slds-item slds-m-right_medium">
							<ButtonIcon name="like" assistiveText="More Options" />
						</li>
						<li className="slds-col slds-item slds-m-right_medium">
							<ButtonIcon name="share_post" assistiveText="More Options" />
						</li>
						<li className="slds-col slds-item slds-m-right_medium">
							<ButtonIcon name="share" assistiveText="More Options" />
						</li>
					</ul>
					<ul className="slds-post__footer-meta-list slds-list_horizontal slds-has-dividers_right slds-text-title">
						<li className="slds-item">20 shares</li>
						<li className="slds-item">259 views</li>
					</ul>
				</footer>
			</article>
		);
	}
}

export default FeedPost;
