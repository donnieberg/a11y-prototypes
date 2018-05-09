import React, { Component } from 'react';
import { Button, ButtonIcon } from 'design-system-react';
import FeedPost from './feed-post';
import FeedComment from './feed-comment';

class FeedItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
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
								<div className="slds-avatar slds-avatar_circle slds-avatar_medium" aria-hidden="true">
									<img alt="Jenna Davis" src="/assets/images/avatar2.jpg" title="Jenna Davis avatar" />
								</div>
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

	renderCommentPublisher (active) {
		return (
			<div className="slds-media slds-comment slds-hint-parent">
				<div className="slds-media__figure">
					<div className="slds-avatar slds-avatar_circle slds-avatar_medium" aria-hidden="true">
						<img alt="Person name" src="./assets/images/avatar2.jpg" title="User avatar" />
					</div>
				</div>
				<div className="slds-media__body">
					<div className="slds-publisher slds-publisher_comment">
						<label htmlFor="comment-text-input-01" className="slds-assistive-text">Write a comment</label>
						<textarea
							id="comment-text-input-01"
							className="slds-publisher__input slds-input_bare slds-text-longform"
							placeholder="Write a comment…"
							ref={(component) => {
								if (active) {
									this.props.events.onRequestFocus(undefined, { ref: component });
								}
							}}
						></textarea>
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

	renderComments (post, postIndex, loading, currentFocus, events, handleKeyUp) {
		const lastCommentIndex = post.comments.length - 1;
		const focusCommentPublisher = currentFocus.comment === post.comments.length;
		return (
			<div className="slds-feed__item-comments">
				<h2 id={`feedPost${postIndex}-comments`} className="slds-assistive-text">{`Feed Item ${postIndex + 1} Comments`}</h2>
				<div
					aria-busy={loading}
					aria-labelledby={`feedPost${postIndex}-comments`}
					role="feed"
				>
					{ post.comments.map((comment, i) => {
						return (
							<FeedComment
								active={currentFocus.comment === i}
								content={comment.content}
								events={events}
								handleKeyUp={handleKeyUp}
								i={i}
								postIndex={postIndex}
								totalComments={post.comments.length}
								user={comment.user}
							/>
						)
					})}
				</div>

				{ this.renderCommentPublisher(focusCommentPublisher) }
			</div>
		)
	}

	render() {
		const {
			active,
			commentsLoading,
			currentFocus,
			events,
			handleKeyUp,
			i,
			post,
			totalPosts
		} = this.props;

		return (
			<article
				aria-describedby={`feedPost${i}-label4`}
				aria-labelledby={`feedPost${i}-label1 feedPost${i}-label2 feedPost${i}-label3`}
				aria-posinset={i + 1}
				aria-setsize={totalPosts}
				className="slds-feed__item"
				data-type="feedItem"
				data-i={i}
				key={`feedItem{i}`}
				onKeyUp={handleKeyUp}
				ref={(component) => {
					if (active) {
						events.onRequestFocus(undefined, { ref: component });
					}
				}}
				tabIndex={ i === 0 ? "0" : "-1" }
			>
				<FeedPost
					content={post.content}
					i={i}
					totalComments={post.comments ? post.comments.length : 0}
					totalPosts={totalPosts}
					user={post.user}
				/>
				{ post.comments
						? this.renderComments(post, i, commentsLoading, currentFocus, events, handleKeyUp)
						: null
				}

				{
					/*
				<FeedPost
					content={post.content}
					i={i}
					totalComments={totalComments}
					user={user}
				/>

				{ i === totalPosts
						? this.renderMoreComments()
						: null
				}


					*/
				}
			</article>
		);
	}
}

export default FeedItem;
