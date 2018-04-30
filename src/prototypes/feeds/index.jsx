import React, { Component } from 'react';
import FeedItem from './components/feed-item';
import FeedComment from './components/feed-comment';

import EventUtil from '../../utilities/event';
import KeyCodes from '../../utilities/key-codes';
import KeyboardNavigable from '../../utilities/keyboard-navigable';

class Feeds extends Component {
	constructor(props) {
		super(props);
		this.firstFocusableLink = React.createRef();
		this.lastFocusableLink = React.createRef();

		this.state = {
			isLoading: false,
			posts: [
				{ user: 'Ron Johnson', content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
				{ user: "Dwayne Wayne", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
				{ user: "Whitley Gilbert", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." },
				{ user: "Kim Reese", content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots." }
			],
			currentFocusedIndex: null
		};
	}

	handleKeyUp = (e) => {
		EventUtil.trapEvent(e);
		const lastIndex = this.state.posts.length - 1;
		const initFocus = this.state.currentFocusedIndex === null && e.keyCode === KeyCodes.TAB && e.target.dataset.type === 'feedItem';
		const moveNext = typeof(this.state.currentFocusedIndex) === 'number' && e.keyCode === KeyCodes.PAGE_DOWN && this.state.currentFocusedIndex < lastIndex;
		const movePrev = typeof(this.state.currentFocusedIndex) === 'number' && e.keyCode === KeyCodes.PAGE_UP && this.state.currentFocusedIndex > 0;
		const moveBeforeFeed = e.ctrlKey && e.keyCode === KeyCodes.HOME;
		const moveAfterFeed = e.ctrlKey && e.keyCode === KeyCodes.END;
		const currentFocusedIndex = this.state.currentFocusedIndex;

		if (initFocus) {
			console.log('initial tab');
			this.setState((prevState, props) => ({
				currentFocusedIndex: 0
			}));
		} else if (moveNext) {
			console.log('down');
			this.setState((prevState, props) => ({
				currentFocusedIndex: prevState.currentFocusedIndex + 1
			}));
		} else if (movePrev) {
			console.log('up');
			this.setState((prevState, props) => ({
				currentFocusedIndex: prevState.currentFocusedIndex - 1
			}));
		} else if (moveBeforeFeed) {
			this.firstFocusableLink.current.focus();
		} else if (moveAfterFeed) {
			this.lastFocusableLink.current.focus();
		} else {
			console.log('more tabbin or some other key we dont care about');
		}
	}

	handleRequestFocusListboxOfPills = (event, { ref }) => {
		if (ref) {
			this.activeItem = ref;
			this.activeItem.focus();
		}
	}

	render() {
		return (
			<div className="slds-feed">
				<a href="javascript:void(0)" ref={this.firstFocusableLink}>Focusable thang before feed</a>
				<ul className="slds-feed__list" role="feed" aria-busy={this.state.isLoading}>
					{this.state.posts.map((post, i) => {
						return (
							<li
								className="slds-feed__item"
								data-index={i}
								id={`feedItem-${i}`}
								key={i}
								role="presentation"
							>
								<FeedItem
									active={this.state.currentFocusedIndex === i}
									content={post.content}
									events={{
										onRequestFocus: this.handleRequestFocusListboxOfPills
									}}
									i={i}
									handleKeyUp={this.handleKeyUp}
									totalPosts={this.state.posts.length}
									user={post.user}
								/>
							</li>
						)
					})}
				</ul>
				<a href="javascript:void(0)" ref={this.lastFocusableLink}>Focusable thang after feed</a>
			</div>
		)
	}
}

export default Feeds;
