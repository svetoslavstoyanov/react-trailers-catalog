import React, { Component } from 'react';
import { Card, Form, OverlayTrigger, Tooltip } from 'react-bootstrap/';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';
import AuthUserContext from './../../Core/Session/Context';
import dateComapre from '../../Core/DateCompare';
import * as ROUTES from '../../Core/Routes';
let TrailersFavoriteView = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<FirebaseContext.Consumer>
				{firebase => (
					<TrailersFavoriteViewPage
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

class TrailersFavoriteViewPage extends Component {
	username;
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.username = user.username;
			this.props.firebase
				.getUserFavorites(user.username)
				.on('value', snapshot => {
					if (snapshot.val()) {
						let favorites = snapshot.val();
						for (const key in favorites) {
							if (
								this.props.match.params.trailerId ===
								favorites[key]
							) {
								this.setState({ favoriteId: key });
							}
						}
					}
				});
		});

		this.props.firebase
			.getOneTrailer(this.props.match.params.trailerId)
			.on('value', snapshot => {
				let trailer = snapshot.val();
				if (trailer) {
					this.setState({ trailer });
				}
			});
	}
	onSubmitDeleteFavorite = e => {
		e.preventDefault();
		this.props.firebase
			.deleteFavorite(this.props.authUser.username, this.state.favoriteId)
			.then(() => {
				this.props.history.push(ROUTES.TRAILERS);
				this.props.notify.show(
					`${this.state.trailer.title} removed from favorites.`,
					'success'
				);
			});
	};
	render() {
		let { trailer } = this.state;

		return (
			<div>
				{trailer ? (
					<div className='col-lg-8 mx-auto m-3'>
						<Card>
							<div className='d-flex'>
								<Card.Title className='mx-auto'>
									{this.state.trailer.title}
								</Card.Title>
								<div className='float-right mr-3 mt-1'>
									<OverlayTrigger
										key='left'
										placement='left'
										overlay={
											<Tooltip>
												Remove from favorites
											</Tooltip>
										}
									>
										<Form
											onSubmit={
												this.onSubmitDeleteFavorite
											}
										>
											<button
												className='btn-favorite'
												type='submit'
											>
												<i className='fas fa-trash' />
											</button>
										</Form>
									</OverlayTrigger>
								</div>
							</div>

							<div className='embed-responsive embed-responsive-21by9'>
								<iframe
									title={this.state.trailer.title}
									className='embed-responsive-item '
									src={
										'https://www.youtube.com/embed/' +
										this.state.trailer.trailerUrl
									}
									allowFullScreen
								/>
							</div>
							<Card.Body>
								<Card.Text>
									{this.state.trailer.description}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className='text-muted'>
									Release date:
									<strong>
										{dateComapre(
											this.state.trailer.releaseDate
										)}
									</strong>
								</small>
							</Card.Footer>
						</Card>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		);
	}
}

export default TrailersFavoriteView;
