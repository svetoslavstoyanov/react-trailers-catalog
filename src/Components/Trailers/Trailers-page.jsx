import React, { Component } from 'react';
import { withAuthorization } from '../../Core/Session';
import Trailer from './Trailer';
import { CardDeck, Card, OverlayTrigger, Tooltip } from 'react-bootstrap/';

class TrailersPage extends Component {
	arrayTrailers;
	isAscending;
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.firebase.trailers().on('value', snapshot => {
			let trailers = snapshot.val();
			if (trailers) {
				this.arrayTrailers = Object.keys(trailers).map(key => ({
					...trailers[key],
					id: key
				}));
				this.arrayTrailers.sort(
					(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
				);
				this.isAscending = true;
				this.setState({ trailers: this.arrayTrailers });
			}
		});
	}
	trailersRender(trailers) {
		return trailers.map(trailer => {
			return <Trailer key={trailer.id} trailer={trailer} />;
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
					Trailers
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
				{trailers ? (
					<CardDeck>{this.trailersRender(trailers)}</CardDeck>
				) : (
					<p>Loading...</p>
				)}
			</div>
		);
	}
}

let condition = authUser => !!authUser;

export default withAuthorization(condition)(TrailersPage);
