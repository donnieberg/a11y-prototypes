import React, { Component } from 'react';
import { Button, ButtonIcon } from 'design-system-react';
import FeedPost from './components/feed-post';
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
			currentFocus: { post: null, comment: null }
		};
	}

	handleKeyUp = (e) => {
		EventUtil.trapEvent(e);
		const currentFocusedPostIndex = this.state.currentFocus.post;
		const currentFocusedCommentIndex = this.state.currentFocus.comment;
		const lastPostIndex = this.state.posts.length - 1;

		// Post: page_down
		const moveNextPost = typeof(currentFocusedPostIndex) === 'number'
			&& e.keyCode === KeyCodes.DOWN
			&& currentFocusedPostIndex < lastPostIndex;

		// Post: page_up
		const movePrevPost = typeof(currentFocusedPostIndex) === 'number'
			&& e.keyCode === KeyCodes.UP
			&& currentFocusedPostIndex > 0;

		// 1st Comment only: alt + page_down
		const jumpFirstComment = typeof(currentFocusedPostIndex) === 'number'
			&& e.keyCode === KeyCodes.J
			&& this.state.posts[currentFocusedPostIndex].comments;

		// Post: cntrl + home
		const jumpBeforeFeed = typeof(currentFocusedPostIndex) === 'number'
			&& e.keyCode === KeyCodes.I;

		// Key Codes --------------------------------------
		// ------------------------------------------------
		// General Tabbing around
		if (e.keyCode === KeyCodes.TAB) {
			console.log('tab');
			if (currentFocusedPostIndex === null) {
				this.setState((prevState, props) => ({
					currentFocus: { post: 0, comment: null }
				}));
			}
		// Jump to next focusable feed: cntrl + end
		} else if (e.keyCode === KeyCodes.K) {
			if (typeof(currentFocusedCommentIndex) === 'number') {
				// if inside comments, move to next feed post
				console.log('jump to next article in outer feed');
				this.setState((prevState, props) => ({
					currentFocus: { post: prevState.currentFocus.post + 1, comment: null }
				}));
			} else {
				// move after feed
				console.log('jump after feed');
				this.lastFocusableLink.current.focus();
			}
		} else if (e.keyCode === KeyCodes.DOWN) {
			console.log('page down');
			// Move down posts: Page down
			if (typeof(currentFocusedCommentIndex) !== 'number') {
				if (currentFocusedPostIndex < lastPostIndex) {
					this.setState((prevState, props) => ({
						currentFocus: { post: prevState.currentFocus.post + 1 , comment: null }
					}));
				}
			} else {
				// Move down comments: Page down
				if (currentFocusedCommentIndex < this.state.posts[currentFocusedPostIndex].comments.length - 1) {
					this.setState((prevState, props) => ({
						currentFocus: { post: prevState.currentFocus.post, comment: prevState.currentFocus.comment + 1 }
					}));
				}
			}
		} else if (movePrevPost) {
			console.log('prev post');
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post - 1 , comment: null }
			}));
		// Instructions --------------------------------------
		// ------------------------------------------------
		} else if (jumpFirstComment) {
			console.log('jump to first comment inside nested feed');
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post, comment: 0 }
			}));
		} else if (jumpBeforeFeed) {
			console.log('jump before feed');
			this.firstFocusableLink.current.focus();
		} else {
			console.log('nope');
		}


		/*
		const initFocus = this.state.currentFocus.post === null && e.keyCode === KeyCodes.TAB && e.target.dataset.type === 'feedPost';
		const moveNext = typeof(this.state.currentFocus.post) === 'number' && e.keyCode === KeyCodes.PAGE_DOWN && this.state.currentFocus.post < lastIndex;
		const movePrev = typeof(this.state.currentFocus.post) === 'number' && e.keyCode === KeyCodes.PAGE_UP && this.state.currentFocus.post > 0;
		const moveBeforeFeed = e.ctrlKey && e.keyCode === KeyCodes.HOME;
		const moveAfterFeed = e.ctrlKey && e.keyCode === KeyCodes.END;

		if (initFocus) {
			console.log('initial tab');
			this.setState((prevState, props) => ({
				currentFocus: { post: 0, comment: null }
			}));
		} else if (moveNext) {
			console.log('down');
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post + 1 , comment: null }
			}));
		} else if (movePrev) {
			console.log('up');
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post - 1 , comment: null }
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
		*/
	}

	handleFocusFeedPost = (event, { ref }) => {
		if (ref) {
			this.activeItem = ref;
			this.activeItem.focus();
		}
	}

	renderCommentPublisher () {
		return (
			<div className="slds-media slds-comment slds-hint-parent">
				<div className="slds-media__figure">
					<a className="slds-avatar slds-avatar_circle slds-avatar_medium" href="javascript:void(0);">
						<img alt="Person name" src="./assets/images/avatar2.jpg" title="User avatar" />
					</a>
				</div>
				<div className="slds-media__body">
					<div className="slds-publisher slds-publisher_comment">
						<label htmlFor="comment-text-input-01" className="slds-assistive-text">Write a comment</label>
						<textarea id="comment-text-input-01" className="slds-publisher__input slds-input_bare slds-text-longform" placeholder="Write a comment…"></textarea>
						<div className="slds-publisher__actions slds-grid slds-grid_align-spread">
							<ul className="slds-grid">
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

	renderComments (post, postIndex) {
		const lastCommentIndex = post.comments.length - 1;
		return (
			<div className="slds-feed__item-comments">
				<ul>
					{ post.comments.map((comment, i) => {
						return (
							<FeedComment
								active={this.state.currentFocus.post === postIndex && this.state.currentFocus.comment === i}
								content={comment.content}
								events={{
									onRequestFocus: this.handleFocusFeedPost
								}}
								handleKeyUp={this.handleKeyUp}
								i={i}
								totalComments={post.comments.length - 1}
								user={comment.user}
							/>
						)
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
								<FeedPost
									active={this.state.currentFocus.post === i}
									content={post.content}
									events={{
										onRequestFocus: this.handleFocusFeedPost
									}}
									handleKeyUp={this.handleKeyUp}
									i={i}
									totalPosts={this.state.posts.length}
									user={post.user}
								/>

								{ post.comments
										? this.renderComments(post, i)
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
