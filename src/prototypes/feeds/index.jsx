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
		const lastCommentIndex = currentFocusedPostIndex !== null && this.state.posts[currentFocusedPostIndex].comments ? this.state.posts[currentFocusedPostIndex].comments.length - 1 : null;

		// Tab init focus
		const initFocus = currentFocusedPostIndex === null
			&& e.keyCode === KeyCodes.TAB;

		// Next Post: J
		const moveNextPost = typeof(currentFocusedPostIndex) === 'number'
			&& !e.shiftKey && e.keyCode === KeyCodes.J
			&& currentFocusedPostIndex < lastPostIndex;

		// Prev Post: K
		const movePrevPost = typeof(currentFocusedPostIndex) === 'number'
			&& !e.shiftKey && e.keyCode === KeyCodes.K
			&& currentFocusedPostIndex > 0;

		// Next Comment: Shift + J
		const moveNextComment = typeof(currentFocusedPostIndex) === 'number'
			&& e.shiftKey && e.keyCode === KeyCodes.J
		  && currentFocusedCommentIndex < lastCommentIndex;

		// Prev Comment: Shift + K
		const movePrevComment = typeof(currentFocusedPostIndex) === 'number'
			&& e.shiftKey && e.keyCode === KeyCodes.K
			&& currentFocusedCommentIndex > 0;

		// Prev Element before Feed: cntrl + home
		const jumpBeforeFeed = typeof(currentFocusedPostIndex) === 'number'
			&& e.ctrlKey && e.keyCode === KeyCodes.HOME;

		// Next Element after Feed: cntrl + end
		const jumpAfterFeed = typeof(currentFocusedPostIndex) === 'number'
			&& e.ctrlKey && e.keyCode === KeyCodes.END;

		// Instructions --------------------------------------
		if (initFocus) {
			this.setState((prevState, props) => ({
				currentFocus: { post: 0, comment: null }
			}));
		} else if (jumpAfterFeed) {
			this.lastFocusableLink.current.focus();
		} else if (jumpBeforeFeed) {
			this.firstFocusableLink.current.focus();
		} else if (moveNextPost) {
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post + 1 , comment: null }
			}));
		} else if (movePrevPost) {
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post - 1 , comment: null }
			}));
		} else if (moveNextComment) {
			if (currentFocusedCommentIndex === null) {
				this.setState((prevState, props) => ({
					currentFocus: { post: prevState.currentFocus.post, comment: 0 }
				}));
			} else {
				this.setState((prevState, props) => ({
					currentFocus: { post: prevState.currentFocus.post, comment: prevState.currentFocus.comment + 1 }
				}));
			}
		} else if (movePrevComment) {
			this.setState((prevState, props) => ({
				currentFocus: { post: prevState.currentFocus.post, comment: prevState.currentFocus.comment - 1 }
			}));
		} else {
			console.log('nope');
		}
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
				<h2 id={`feedPost${postIndex}-comments`} className="slds-assistive-text">{`${post.comments.length} Comments to Post ${postIndex}`}</h2>
				<ul
					aria-busy={this.state.isLoading}
					aria-labelledby={`feedPost${postIndex}-comments`}
					role="feed"
				>
					{ post.comments.map((comment, i) => {
						return (
							<li key={`feedPost${postIndex}-feedComment${i}`}>
								<FeedComment
									active={this.state.currentFocus.post === postIndex && this.state.currentFocus.comment === i}
									content={comment.content}
									events={{
										onRequestFocus: this.handleFocusFeedPost
									}}
									handleKeyUp={this.handleKeyUp}
									i={i}
									postIndex={postIndex}
									totalComments={post.comments.length}
									user={comment.user}
								/>
							</li>
						)
					})}
				</ul>

				{ this.renderCommentPublisher() }
			</div>
		)
	}

	renderMoreComments () {
		return (
			<div className="slds-feed__item-comments">
				<div id="moreCommentsContainer" className="slds-p-horizontal_medium slds-p-vertical_x-small slds-grid">
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
										<ButtonIcon name="more" assistiveText="More options" />
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

	render() {
		return (
			<div>
				<ol>
					<li>1. Page Down: Move focus to next article.</li>
					<li>2. Page Up: Move focus to previous article.</li>
					<li>3. Control + End: Move focus to the first focusable element after the feed or if you're inside nested feed, moves focus to the next article in the outer feed..</li>
					<li>4. Control + Home: Move focus to the first focusable element before the feed.</li>
					<li>5. Alt + Page Down (J for now): Move focus from the elements in the containing article to the first item in the nested feed.</li>
				</ol>
				<div>
					<a href="https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#feed" ref={this.firstFocusableLink}>Aria Feeds Spec</a>
					<div className="slds-feed">
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
										key={`feedPost${i}`}
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
											totalComments={post.comments ? post.comments.length : 0}
											totalPosts={this.state.posts.length}
											user={post.user}
										/>

									{ post.comments
											? this.renderComments(post, i)
											: null
									}

									{ i === this.state.posts.length - 1
											? this.renderMoreComments()
											: null
									}

								</li>
								)
							})}
						</ul>
						<a href="javascript:void(0)" ref={this.lastFocusableLink}>Focusable thang after feed</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Feeds;
