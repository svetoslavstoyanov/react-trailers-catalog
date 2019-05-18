import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap/';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../Core/Firebase/index';
import * as ROUTES from '../../Core/Routes';
import { compose } from 'recompose';
import { FirebaseContext } from '../../Core/Firebase/index';
import { notify } from 'react-notify-toast';
import * as ROLES from '../../Core/Roles';

const RegisterPage = props => (
	<FirebaseContext.Consumer>
		{firebase => (
			<Register {...props} firebase={firebase} notify={notify} />
		)}
	</FirebaseContext.Consumer>
);
let initialState = {
	email: '',
	username: '',
	password: '',
	confirmPassword: '',
	isAdmin: false
};

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };
	}
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		let { username, email, password, isAdmin } = this.state;
		let roles = {};

		if (isAdmin) {
			roles[ROLES.ADMIN] = ROLES.ADMIN;
		}

		this.props.firebase
			.registerUser(email, password)
			.then(authUser => {
				return this.props.firebase.user(authUser.user.uid).set({
					username,
					email,
					roles
				});
			})
			.then(() => {
				this.props.notify.show('Successful registration!', 'success');
				this.setState({ ...initialState });
				this.props.history.push(ROUTES.LOGIN);
			})
			.catch(error => {
				this.props.notify.show(`${error}`, 'error');
			});
	};
	onChangeCheckbox = e => {
		this.setState({ [e.target.name]: e.target.checked });
	};
	render() {
		let {
			email,
			username,
			password,
			confirmPassword,
			isAdmin
		} = this.state;
		let isInvalid =
			password !== confirmPassword ||
			password === '' ||
			email === '' ||
			username === '';
		return (
			<Form className='col-6 mx-auto  m-3' onSubmit={this.onSubmit}>
				<Card.Title className='text-center'>Register</Card.Title>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name='email'
						value={email}
						type='email'
						placeholder='Enter email'
						onChange={this.onChange}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						name='username'
						type='text'
						placeholder='Enter username'
						onChange={this.onChange}
						value={username}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						placeholder='Password'
						onChange={this.onChange}
						value={password}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						type='password'
						name='confirmPassword'
						placeholder='Confirm password'
						onChange={this.onChange}
						value={confirmPassword}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicChecbox'>
					<Form.Check
						type='checkbox'
						name='isAdmin'
						checked={isAdmin}
						onChange={this.onChangeCheckbox}
						label='Admin'
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
				<p>
					Already have an account?
					<Link to={ROUTES.LOGIN}>Login</Link>
				</p>
			</Form>
		);
	}
}

let RegisterForm = compose(
	withRouter,
	withFirebase
)(Register);

export default RegisterPage;
export { RegisterForm };
