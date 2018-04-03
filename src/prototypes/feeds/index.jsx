import React, { Component } from 'react';
import FeedItem from './components/feed-item';
import FeedComment from './components/feed-comment';
import KeyboardNavigable from '../../utilities/keyboard-navigable';

class Feeds extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	render() {
		const posts = [
			{ user: 'Ron Johnson', content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
			{ user: "Dwayne Wayne", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
			{ user: "Whitley Gilbert", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
			{ user: "Kim Reese", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." }
		];

		return (
			<div className="slds-feed">
				<ul className="slds-feed__list" role="feed" aria-busy={this.state.isLoading}>
					{posts.map((post, i) => {
						return (
							<li className="slds-feed__item" role="presentation">
								<FeedItem
									i={i + 1}
									user={post.user}
									content={post.content}
									totalPosts={posts.length}
								/>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Feeds;
