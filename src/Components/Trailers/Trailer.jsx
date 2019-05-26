import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import { NavLink, withRouter } from 'react-router-dom';
import * as ROUTES from '../../Core/Routes';
import { notify } from 'react-notify-toast';
import { FirebaseContext } from '../../Core/Firebase/index';
import dateCompare from '../../Core/DateCompare';

const Trailer = props => (
	<FirebaseContext.Consumer>
		{firebase => (
			<TrailerClass {...props} firebase={firebase} notify={notify} />
		)}
	</FirebaseContext.Consumer>
);

class TrailerClass extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	redirectToTrailer = e => {
		e.preventDefault();
		if (this.props.isFavorite) {
			this.props.history.push(
				ROUTES.PROFILE + '/' + this.props.trailer.id
			);
		} else {
			this.props.history.push(
				ROUTES.TRAILERS + '/' + this.props.trailer.id
			);
		}
	};
	render() {
		return (
			<NavLink
				className='trailer-hover'
				to=''
				onClick={this.redirectToTrailer}
			>
				<Card>
					<Card.Img
						variant='top'
						className='img-trailer'
						src={this.props.trailer.imageUrl}
					/>
					<Card.Body>
						<Card.Title className='title-trailer'>
							{this.props.trailer.title}
						</Card.Title>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>
							Release date:
							<strong>
								{dateCompare(this.props.trailer.releaseDate)}
							</strong>
						</small>
					</Card.Footer>
				</Card>
			</NavLink>
		);
	}
}

export default withRouter(Trailer);
