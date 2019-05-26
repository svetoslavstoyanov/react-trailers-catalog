import React, { Component } from 'react';
import { Card } from 'react-bootstrap/';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';
import TrailerComments from './Trailer-comments';
import AuthUserContext from './../../Core/Session/Context';
import TrailerFavorite from './Trailer-favorite';
import dateComapre from '../../Core/DateCompare';
let TrailerView = props => (
	<AuthUserContext.Consumer>
		{authUser => (
			<FirebaseContext.Consumer>
				{firebase => (
					<TrailerViewPage
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

class TrailerViewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {
		this.props.firebase
			.getOneTrailer(this.props.match.params.trailerId)
			.on('value', snapshot => {
				let trailer = snapshot.val();
				if (trailer) {
					this.setState({ trailer });
				}
			});
	}

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
								<TrailerFavorite
									trailerId={
										this.props.match.params.trailerId
									}
									trailerTitle={this.state.trailer.title}
								/>
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
								<TrailerComments
									trailer={this.state.trailer}
									trailerId={
										this.props.match.params.trailerId
									}
								/>
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

export default TrailerView;
