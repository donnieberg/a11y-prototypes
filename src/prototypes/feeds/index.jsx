import React, { Component } from 'react';
import { Button, ButtonIcon } from 'design-system-react';
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
				{ user: 'Ron Johnson', content: "Hey there! Here is the latest demo presentation  let me know if there are any changes. I updated slides 3-8 and slides 16-18 slides with new product shots.", comments: [
					{ user: 'Denise Huxtable', content: "Thanks for letting us know, Ron! New product shots look great." },
					{ user: 'Jaleesa Vinson-Taylor', content: "Thanks for letting us know, Ron! New product shots look great." },
					{ user: 'Freddie Brooks', content: "Thanks for letting us know, Ron! New product shots look great." }
				] },
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
			console.log('focus first element before feed');
			this.firstFocusableLink.current.focus();
		} else if (moveAfterFeed) {
			console.log('focus first element after feed');
			this.lastFocusableLink.current.focus();
		} else {
			console.log('more tabbin or some other key we dont care about');
		}
	}

	handleFocusFeedItem = (event, { ref }) => {
		if (ref) {
			this.activeItem = ref;
			this.activeItem.focus();
		}
	}

	renderCommentPublisher () {
		return (
			<div class="slds-media slds-comment slds-hint-parent">
				<div class="slds-media__figure">
					<a class="slds-avatar slds-avatar_circle slds-avatar_medium" href="javascript:void(0);">
						<img alt="Person name" src="./assets/images/avatar2.jpg" title="User avatar" />
					</a>
				</div>
				<div class="slds-media__body">
					<div class="slds-publisher slds-publisher_comment">
						<label for="comment-text-input-01" class="slds-assistive-text">Write a comment</label>
						<textarea id="comment-text-input-01" class="slds-publisher__input slds-input_bare slds-text-longform" placeholder="Write a comment…"></textarea>
						<div class="slds-publisher__actions slds-grid slds-grid_align-spread">
							<ul class="slds-grid">
								<li>
									<ButtonIcon name="add_user" assistiveText="Add user" />
								</li>
								<li>
									<ButtonIcon name="attach" assistiveText="Attach" />
								</li>
							</ul>
							<Button label="Comment" variant="brand" />
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderComments (post) {
		const lastCommentIndex = post.comments.length - 1;
		return (
			<div className="slds-feed__item-comments">
				<ul>
					{ post.comments.map((comment, i) => {
						return <FeedComment user={comment.user} content={comment.content} />;
					})}
				</ul>

				{ this.renderCommentPublisher() }
			</div>
		)
	}

	render() {
		return (
			<div className="slds-feed">
				<a href="javascript:void(0)" ref={this.firstFocusableLink}>Focusable thang before feed</a>
				<h1 id="feeds-header">Chatter</h1>
				<ul
					aria-busy={this.state.isLoading}
					aria-labelledby="feeds-header"
					className="slds-feed__list"
					role="feed"
				>
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
										onRequestFocus: this.handleFocusFeedItem
									}}
									i={i}
									handleKeyUp={this.handleKeyUp}
									totalPosts={this.state.posts.length}
									user={post.user}
								/>

								{ post.comments
										? this.renderComments(post)
										: null
								}

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
