import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Core/Routes';
import LogoutLink from '../Authentication/Logout';
import AuthUserContext from './../../Core/Session/Context';
let Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => (authUser ? <NavigationAuth /> : <NavigationNoAuth />)}
		</AuthUserContext.Consumer>
	</div>
);

let NavigationAuth = () => (
	<div>
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to={ROUTES.HOME}>
				Home
			</Link>

			<Link className='navbar-brand' to='/'>
				<LogoutLink />
			</Link>
		</nav>
	</div>
);

let NavigationNoAuth = () => (
	<div>
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to={ROUTES.LANDING}>
				Trailers
			</Link>
			<Link className='navbar-brand' to={ROUTES.LOGIN}>
				Login
			</Link>

			<Link className='navbar-brand' to={ROUTES.REGISTER}>
				Register
			</Link>
		</nav>
	</div>
);

export default Navigation;
