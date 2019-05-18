import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap/';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Core/Firebase/index';
import { FirebaseContext } from '../../Core/Firebase/index';
import * as ROUTES from '../../Core/Routes';
import { notify } from 'react-notify-toast';

let LoginPage = props => (
	<FirebaseContext.Consumer>
		{firebase => <Login {...props} firebase={firebase} notify={notify} />}
	</FirebaseContext.Consumer>
);

let initialState = {
	email: '',
	password: ''
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };
	}

	onSubmit = e => {
		e.preventDefault();

		let { email, password } = this.state;

		this.props.firebase
			.loginUser(email, password)
			.then(() => {
				this.props.notify.show('Successful login!', 'success');
				this.setState({ ...initialState });
				this.props.history.push(ROUTES.TRAILERS);
			})
			.catch(error => {
				this.props.notify.show(`${error}`, 'error');
			});
	};
	onSubmitGoogle = e => {
		e.preventDefault();
		this.props.firebase
			.loginUserWithGoogle()
			.then(socialAuthUser => {
				return this.props.firebase.user(socialAuthUser.user.uid).set({
					username:
						socialAuthUser.additionalUserInfo.profile.given_name,
					email: socialAuthUser.user.email,
					roles: {}
				});
			})
			.then(socialAuthUser => {
				this.setState({});
				this.props.history.push(ROUTES.TRAILERS);
			})
			.catch(error => {
				this.props.notify.show(`${error}`, 'error');
			});
	};

	onSubmitFacebook = e => {
		e.preventDefault();

		this.props.firebase
			.loginUserWithFaceBook()
			.then(socialAuthUser => {
				return this.props.firebase.user(socialAuthUser.user.uid).set({
					username:
						socialAuthUser.additionalUserInfo.profile.first_name,
					email: socialAuthUser.additionalUserInfo.profile.email,
					roles: {}
				});
			})
			.then(socialAuthUser => {
				this.props.history.push(ROUTES.TRAILERS);
			})
			.catch(error => {
				this.props.notify.show(`${error}`, 'error');
			});
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		let { email, password } = this.state;
		let isInvalid = email === '' || password === '';
		return (
			<div className='col-6 mx-auto m-3'>
				<Form onSubmit={this.onSubmit}>
					<Card.Title className='text-center'>Login</Card.Title>

					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							name='email'
							value={email}
							onChange={this.onChange}
							type='email'
							placeholder='Enter email'
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							name='password'
							value={password}
							onChange={this.onChange}
							type='password'
							placeholder='Password'
						/>
					</Form.Group>
					<Button
						disabled={isInvalid}
						variant='primary'
						type='submit'
					>
						Submit
					</Button>
					<p>
						Don't have an account?
						<Link to={ROUTES.REGISTER}>Register</Link>
					</p>
				</Form>
				<div className='inline'>
					<Form
						className='btn btn-small'
						onSubmit={this.onSubmitGoogle}
					>
						<Button className='btn-google' type='submit'>
							Login with <i className='fab fa-google' />
						</Button>
					</Form>

					<Form
						className='btn btn-small'
						onSubmit={this.onSubmitFacebook}
					>
						<Button className='btn-facebook' type='submit'>
							Login with <i className='fab fa-facebook-square' />
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

let LoginForm = compose(
	withRouter,
	withFirebase
)(Login);

export default LoginPage;

export { LoginForm };
