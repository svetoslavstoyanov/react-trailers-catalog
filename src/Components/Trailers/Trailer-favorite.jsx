import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, Form } from 'react-bootstrap/';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';
import AuthUserContext from './../../Core/Session/Context';

let TrailerFavorite = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<FirebaseContext.Consumer>
				{firebase => (
					<FavoriteClass
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

class FavoriteClass extends Component {
	isFavorite = false;
	constructor(props) {
		super(props);
		this.state = { isFavorite: false, favoriteId: '' };
	}

	componentDidMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.props.firebase
				.getUserFavorites(user.username)
				.on('value', snapshot => {
					if (snapshot.val()) {
						let favorites = snapshot.val();
						for (const [key, value] of Object.entries(favorites)) {
							if (value === this.props.trailerId) {
								this.setState({ isFavorite: true });
								this.setState({ favoriteId: key });
							}
						}
					}
				});
		});
	}
	onSubmitFavorite = e => {
		e.preventDefault();
		this.props.firebase
			.postFavorite(this.props.trailerId, this.props.authUser.username)
			.then(() => {
				this.props.notify.show(
					`${this.props.trailerTitle} added to favorites.`,
					'success'
				);
			});
	};
	onSubmitDeleteFavorite = e => {
		e.preventDefault();
		this.props.firebase
			.deleteFavorite(this.props.authUser.username, this.state.favoriteId)
			.then(() => {
				this.props.notify.show(
					`${this.props.trailerTitle} removed from favorites.`,
					'success'
				);
			});
		this.setState({ isFavorite: false });
		this.isFavorite = false;
	};
	render() {
		return (
			<div>
				{this.state.isFavorite !== true ? (
					<div className='float-right mr-3 mt-1'>
						<OverlayTrigger
							key='left'
							placement='left'
							overlay={<Tooltip>Add to favorites</Tooltip>}
						>
							<Form onSubmit={this.onSubmitFavorite}>
								<button className='btn-favorite' type='submit'>
									<i className='far fa-heart' />
								</button>
							</Form>
						</OverlayTrigger>
					</div>
				) : (
					<div className='float-right mr-3 mt-1'>
						<OverlayTrigger
							key='left'
							placement='left'
							overlay={<Tooltip>Remove from favorites</Tooltip>}
						>
							<Form onSubmit={this.onSubmitDeleteFavorite}>
								<button className='btn-favorite' type='submit'>
									<i className='fas fa-heart' />
								</button>
							</Form>
						</OverlayTrigger>
					</div>
				)}
			</div>
		);
	}
}

export default TrailerFavorite;
