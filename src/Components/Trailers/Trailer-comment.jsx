import React, { Component } from 'react';
import { Form, ListGroup } from 'react-bootstrap/';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';

let Comment = props => (
	<FirebaseContext.Consumer>
		{firebase => (
			<CommentClass {...props} firebase={firebase} notify={notify} />
		)}
	</FirebaseContext.Consumer>
);

class CommentClass extends Component {
	isLastComment = false;
	username;
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.username = user.username;
			this.setState({ username: user.username });
		});
	}

	onDeleteComment = e => {
		e.preventDefault();
		if (this.props.commentsLength === 1) {
			this.isLastComment = true;
		}
		this.props.firebase
			.deleteComment(this.props.trailerId, this.props.commentId)
			.then(() => {
				this.props.notify.show(
					'Comment deleted successfully',
					'success'
				);
			});
		this.setState({});
	};
	render() {
		let comment = this.props.comment;
		return (
			<div>
				{!this.isLastComment && this.state.username !== undefined ? (
					<ListGroup.Item key={comment.id}>
						<strong>{comment.username}:</strong> {comment.comment}
						{this.state.username === comment.username ||
						this.state.username === 'Admin' ? (
							<Form
								className=' float-right'
								onSubmit={this.onDeleteComment}
							>
								<button
									className='btn-comment-delete'
									type='submit'
								>
									<i className='far fa-trash-alt' />
								</button>
							</Form>
						) : null}
					</ListGroup.Item>
				) : null}
			</div>
		);
	}
}

export default Comment;
