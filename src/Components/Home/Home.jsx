import React, { Component } from 'react';
import { Image, Container, Col, Row, Modal } from 'react-bootstrap';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Container>
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Trailers catalog</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Row>
							<Col xs={16} md={10} className='m-auto'>
								<Image
									src='https://cdn.pixabay.com/photo/2015/09/02/12/45/movie-918655_1280.jpg'
									thumbnail
								/>
							</Col>
						</Row>
					</Modal.Body>

					<Modal.Footer>
						<p>
							This is Single Page Application based on React. Here
							you can browse catalog of trailers of movies. If you
							liked some of the trailers you can move then to your
							favorites and also put comments after you have
							watched them.
						</p>
					</Modal.Footer>
				</Modal.Dialog>
			</Container>
		);
	}
}

export default Home;
