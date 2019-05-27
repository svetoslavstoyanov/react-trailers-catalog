import React, { Component } from 'react';
import { FirebaseContext } from '../../Core/Firebase/index';
import { Form, Button, Badge } from 'react-bootstrap/';
import { notify } from 'react-notify-toast';

let Like = props => (
	<FirebaseContext.Consumer>
		{firebase => (
			<LikeClass {...props} firebase={firebase} notify={notify} />
		)}
	</FirebaseContext.Consumer>
);

class LikeClass extends Component {
	likes;
	likesCnt;
	username;

	constructor(props) {
		super(props);
		this.state = { isLiked: false, username: '', likesCnt: 0 };
	}

	componentDidMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.setState({ username: user.username });
			this.props.firebase
				.getLikes(this.props.trailerId)
				.on('value', snapshot => {
					if (snapshot.val()) {
						this.likes = Object.keys(snapshot.val()).map(key => ({
							...snapshot.val()[key]['likes'],
							id: key,
							username: snapshot.val()[key]['username']
						}));
						this.setState({ likesCnt: this.likes.length });
						this.likes.forEach(obj => {
							if (obj['username'] === this.state.username) {
								return this.setState({ isLiked: true });
							}
						});
					} else {
						this.setState({ isLiked: false, likesCnt: 0 });
					}
				});
		});
	}

	onSubmitLike = e => {
		e.preventDefault();
		this.setState({ isLiked: true, likesCnt: this.state.likesCnt + 1 });

		let likeState = { likes: 1, username: this.state.username };
		this.props.firebase.postLike(likeState, this.props.trailerId);
	};
	onDeleteLike = e => {
		e.preventDefault();
		this.setState({ isLiked: false, likesCnt: this.state.likesCnt - 1 });

		let likeIds = [];
		this.likes.forEach(obj => {
			if (obj['username'] === this.state.username) {
				likeIds.push(obj['id']);
			}
		});
		likeIds.forEach(like => {
			this.props.firebase.deleteLike(this.props.trailerId, like);
		});
	};
	render() {
		return (
			<div>
				{!this.state.isLiked ? (
					<Form onSubmit={this.onSubmitLike}>
						<Button className='btn-like' variant='primary' type='submit'>
							<i className='far fa-thumbs-up' />
							<Badge className='badge'>
								{this.state.likesCnt}
							</Badge>
						</Button>
					</Form>
				) : (
					<Form onSubmit={this.onDeleteLike}>
						<Button className='btn-like' variant='primary' type='submit'>
							<i className='fas fa-thumbs-up' />
							<Badge className='badge'>
								{this.state.likesCnt}
							</Badge>
						</Button>
					</Form>
				)}
			</div>
		);
	}
}

export default Like;
