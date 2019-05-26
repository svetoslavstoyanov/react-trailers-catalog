import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../Core/Firebase/Context';
import withAuthorization from './../../Core/Session/withAuthorization';
import * as ROLES from '../../Core/Roles';
import { Form, Card, Button } from 'react-bootstrap/';
import * as ROUTES from '../../Core/Routes';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';

const AdminPage = props => (
	<FirebaseContext.Consumer>
		{firebase => (
			<AdminBase {...props} firebase={firebase} notify={notify} />
		)}
	</FirebaseContext.Consumer>
);
let initialState = {
	title: '',
	trailerUrl: '',
	imageUrl: '',
	description: '',
	likes: '',
	comments: '',
	releaseDate: ''
};

class AdminBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...initialState };
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.firebase.postTrailers(this.state);
		this.props.notify.show(
			`'${this.state.title}' uploaded successfully`,
			'success'
		);
		this.setState({});

		this.props.history.push(ROUTES.TRAILERS);
	};
	onChange = e => {
		let [name, value] = [e.target.name, e.target.value];
		name === 'trailerUrl'
			? this.setState({ [name]: value.split('v=')[1] })
			: this.setState({ [name]: value });
	};

	render() {
		let {
			title,
			trailerUrl,
			imageUrl,
			description,
			releaseDate
		} = this.state;
		let isInvalid =
			title === '' ||
			trailerUrl === '' ||
			imageUrl === '' ||
			description === '' ||
			releaseDate === '';

		return (
			<Form className='col-6 mx-auto  m-3' onSubmit={this.onSubmit}>
				<Card.Title className='text-center'>Upload Trailer</Card.Title>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						name='title'
						value={title}
						type='text'
						placeholder='Enter trailer title'
						onChange={this.onChange}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Trailer Url</Form.Label>
					<Form.Control
						name='trailerUrl'
						type='text'
						placeholder='Enter trailer url to get id'
						onChange={this.onChange}
						value={trailerUrl}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Image Url</Form.Label>
					<Form.Control
						name='imageUrl'
						type='text'
						placeholder='Enter image url address'
						onChange={this.onChange}
						value={imageUrl}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						name='description'
						type='text'
						placeholder='Enter description'
						onChange={this.onChange}
						value={description}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Release date</Form.Label>
					<Form.Control
						name='releaseDate'
						type='date'
						placeholder='Enter release date'
						onChange={this.onChange}
						value={releaseDate}
					/>
				</Form.Group>
				<Button
					disabled={isInvalid}
					variant='primary'
					type='submit'
					onSubmit={this.onSubmit}
				>
					Submit
				</Button>
			</Form>
		);
	}
}

let condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
	withAuthorization(condition),
	withFirebase
)(AdminPage);
