import React, { Component } from 'react';
import {
	Button,
	InputGroup,
	FormControl,
	Form,
	ListGroup
} from 'react-bootstrap/';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';
import AuthUserContext from './../../Core/Session/Context';
import Comment from './Trailer-comment';
import Like from './Trailer-like';

const TrailerComments = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<FirebaseContext.Consumer>
				{firebase => (
					<TrailerCommentsClass
						{...props}
						firebase={firebase}
						notify={notify}
						authUser={authUser}
					/>
				)}
			</FirebaseContext.Consumer>
		)}
	</AuthUserContext.Consumer>
);
class TrailerCommentsClass extends Component {
	username;
	likes;
	comments;
	commentsLength;
	initialState = { comment: '', likes: '', username: this.username };

	constructor(props) {
		super(props);
		this.state = {
			...this.initialState
		};
	}

	componentWillMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.username = user.username;
		});
		this.props.firebase
			.getComments(this.props.trailerId)
			.on('value', snapshot => {
				if (snapshot.val()) {
					this.comments = Object.keys(snapshot.val()).map(key => ({
						...snapshot.val()[key],
						id: key
					}));
					this.commentsLength = this.comments.length;
				}
			});
	}
	componentWillUnmount() {
		this.setState = {};
	}

	onChange = e => {
		let [name, value] = [e.target.name, e.target.value];
		this.setState({ [name]: value });
	};

	onSubmitComment = e => {
		e.preventDefault();
		let commentTrim = this.state.comment.trim();
		let commentState = {
			comment: commentTrim,
			username: this.username
		};
		commentTrim !== ''
			? this.props.firebase
					.postComment(commentState, this.props.trailerId)
					.then(() => {
						this.props.notify.show(
							'Comment posted successfully',
							'success'
						);
					})
			: this.props.notify.show('Cannot post empty comment', 'error');
		this.setState({ ...this.initialState });
	};

	commentsRender(comments) {
		return comments.map(comment => {
			return (
				<Comment
					key={comment.id}
					comment={comment}
					commentId={comment.id}
					username={this.username}
					trailerId={this.props.trailerId}
					commentsLength={this.commentsLength}
				/>
			);
		});
	}

	render() {
		let { comment } = this.state;

		let isInvalid = comment === '';

		return (
			<div>
				<div className='d-flex justify-content-between align-items-start'>
					<Like
						username={this.username}
						trailerId={this.props.trailerId}
					/>
					<Form onSubmit={this.onSubmitComment}>
						<InputGroup className='mb-3 col-12'>
							<FormControl
								name='comment'
								type='text'
								placeholder='Write comment'
								onChange={this.onChange}
								value={comment}
							/>
							<InputGroup.Append>
								<Button
									disabled={isInvalid}
									type='submit'
									variant='primary'
								>
									Button
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Form>
				</div>
				<ListGroup className='mx-auto col-12'>
					{this.comments ? (
						this.commentsRender(this.comments)
					) : (
						<p>No comments</p>
					)}
				</ListGroup>
			</div>
		);
	}
}

export default TrailerComments;
