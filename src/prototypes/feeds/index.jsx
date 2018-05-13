import React, { Component } from 'react';
import { Button, ButtonIcon } from 'design-system-react';
import FeedItem from './components/feed-item';
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
		const lastCommentIndex = currentFocusedPostIndex !== null && this.state.posts[currentFocusedPostIndex].comments ? this.state.posts[currentFocusedPostIndex].comments.length : null;

		if (currentFocusedPostIndex === null && !e.shiftKey && e.keyCode === KeyCodes.TAB) {
			console.log('tab');
			this.setState((prevState, props) => ({
				currentFocus: { post: 0, comment: null }
			}));
		// NEXT ===========================================
		} else if (e.keyCode === KeyCodes.J) {
			if (!e.shiftKey) {
				if (typeof(currentFocusedPostIndex) === 'number' && currentFocusedPostIndex < lastPostIndex) {
					console.log('next post');
					this.setState((prevState, props) => ({
						currentFocus: { post: prevState.currentFocus.post + 1, comment: null }
					}));
				}
			} else {
				// after last comment, focus on the comment publisher
				if (typeof(currentFocusedPostIndex) === 'number' && currentFocusedCommentIndex < lastCommentIndex) {
					console.log('next comment');
					if (currentFocusedCommentIndex === null) {
						this.setState((prevState, props) => ({
							currentFocus: { post: prevState.currentFocus.post, comment: 0 }
						}));
					} else {
						if (currentFocusedCommentIndex < lastCommentIndex) {
							this.setState((prevState, props) => ({
								currentFocus: { post: prevState.currentFocus.post, comment: prevState.currentFocus.comment + 1 }
							}));
						}
					}
				}
			}

		// PREVIOUS ===========================================
		} else if (e.keyCode === KeyCodes.K) {
			if (!e.shiftKey) {
				if (currentFocusedPostIndex > 0) {
					console.log('prev post');
					this.setState((prevState, props) => ({
						currentFocus: { post: prevState.currentFocus.post - 1 , comment: null }
					}));
				} else if (currentFocusedPostIndex === 0) {
					this.setState((prevState, props) => ({
						currentFocus: { post: 0, comment: null }
					}));
				}
			} else {
				if (typeof(currentFocusedPostIndex) === 'number' && currentFocusedCommentIndex > 0) {
					console.log('prev comment');
					this.setState((prevState, props) => ({
						currentFocus: { post: prevState.currentFocus.post, comment: prevState.currentFocus.comment - 1 }
					}));
				}
			}
		// NEXT ITEM AFTER FEED ===========================================
		} else if (e.ctrlKey && e.keyCode === KeyCodes.END) {
			this.lastFocusableLink.current.focus();
			this.setState((prevState, props) => ({
				currentFocus: { post: null, comment: null }
			}));
		// PREV ITEM BEFORE FEED ===========================================
		} else if (e.ctrlKey && e.keyCode === KeyCodes.HOME) {
			this.firstFocusableLink.current.focus();
			this.setState((prevState, props) => ({
				currentFocus: { post: null, comment: null }
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

	render() {
		return (
			<div className="slds-grid">
				<section className="prm pos-fix slds-col slds-size_3-of-12">
					<h1>Keyboard Interaction</h1>
					<ol>
						<li><span className="f3">1. J:</span> Move focus to next feed item.</li>
						<li><span className="f3">2. K:</span> Move focus to previous feed item.</li>
						<li><span className="f3">3. shift + J:</span> Move focus to next comment inside the current feed item.</li>
						<li><span className="f3">4. shift + K:</span> Move focus to previous feed comment inside the current feed item.</li>
						<li><span className="f3">5. Control + End:</span> Move focus to the first focusable element after the feed</li>
						<li><span className="f3">6. Control + Home:</span> Move focus to the first focusable element before the feed.</li>
					</ol>
				</section>
				<div className="slds-col slds-size_9-of-12 pt-main-container pl-feed">
					<a href="https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#feed" ref={this.firstFocusableLink}>Aria Feeds Spec</a>
					<div className="slds-feed">
						<h2 id="feeds-header">Chatter</h2>
						<div
							aria-busy={this.state.isLoading}
							aria-labelledby="feeds-header"
							className="slds-feed__list"
							role="feed"
						>
							{this.state.posts.map((post, i) => {
								return (
									<FeedItem
										active={this.state.currentFocus.post === i && this.state.currentFocus.comment === null}
										commentsLoading={false}
										currentFocus={this.state.currentFocus}
										events={{
											onRequestFocus: this.handleFocusFeedPost
										}}
										handleKeyUp={this.handleKeyUp}
										i={i}
										post={post}
										totalPosts={this.state.posts.length}
									/>
								)
							})}
						</div>
						<a href="javascript:void(0)" ref={this.lastFocusableLink}>Focusable thang after feed</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Feeds;
