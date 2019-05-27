import React, { Component } from 'react';
import { withAuthorization } from '../../Core/Session';
import Trailer from '../Trailers/Trailer';
import { CardDeck, Card, OverlayTrigger, Tooltip } from 'react-bootstrap/';

class TrailersFavoritePage extends Component {
	arrayTrailers;
	isAscending;
	username;
	constructor(props) {
		super(props);
		this.state = { trailers: '' };
	}

	componentWillMount() {
		this.props.firebase.onAuthUserListener(user => {
			this.username = user.username;
			this.props.firebase
				.getFavorites(this.username)
				.on('value', snapshot => {
					let trailers = snapshot.val();
					let tempArray = [];
					for (const key in trailers) {
						this.props.firebase
							.getOneTrailer(trailers[key])
							.on('value', snapshot => {
								let trailer = snapshot.val();
								trailer['id'] = trailers[key];
								trailer['favoriteId'] = key;
								tempArray.push(trailer);
							});
					}
					this.arrayTrailers = tempArray;
					this.setState({ trailers: this.arrayTrailers });
				});
		});
	}
	trailersRender(trailers) {
		let isFavorite = true;
		return trailers.map(trailer => {
			return (
				<Trailer
					key={trailer.id}
					trailer={trailer}
					isFavorite={isFavorite}
					favoriteId={trailer.favoriteId}
				/>
			);
		});
	}

	onAscending = e => {
		this.isAscending = false;
		this.arrayTrailers.sort(
			(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
		);
		this.setState({ trailers: this.arrayTrailers });
	};

	onDescending = e => {
		this.isAscending = true;
		this.sortDirection = this.arrayTrailers.sort(
			(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
		);
		this.setState({ trailers: this.arrayTrailers });
	};
	render() {
		let { trailers } = this.state;
		return (
			<div className='col-12 mx-auto m-3'>
				<Card.Title className='text-center heading-top'>
					Favorites
					{this.isAscending ? (
						<OverlayTrigger
							key='left'
							placement='left'
							overlay={<Tooltip>Switch to descending</Tooltip>}
						>
							<i
								onClick={this.onAscending}
								className='fas fa-caret-up float-right'
							/>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							key='left'
							placement='left'
							overlay={<Tooltip>Switch to ascending</Tooltip>}
						>
							<i
								onClick={this.onDescending}
								className='fas fa-caret-down  float-right'
							/>
						</OverlayTrigger>
					)}
				</Card.Title>
				{trailers !== '' ? (
					<CardDeck>{this.trailersRender(trailers)}</CardDeck>
				) : (
					<p>Still no favorites...</p>
				)}
			</div>
		);
	}
}

let condition = authUser => !!authUser;

export default withAuthorization(condition)(TrailersFavoritePage);
