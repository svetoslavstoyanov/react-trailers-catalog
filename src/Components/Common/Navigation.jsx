import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Core/Routes';
import * as ROLES from '../../Core/Roles';
import LogoutLink from '../Authentication/Logout';
import AuthUserContext from './../../Core/Session/Context';
let Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser =>
				authUser ? (
					<NavigationAuth authUser={authUser} />
				) : (
					<NavigationNoAuth />
				)
			}
		</AuthUserContext.Consumer>
	</div>
);

let NavigationAuth = ({ authUser }) => (
	<div>
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to={ROUTES.TRAILERS}>
				Trailers
			</Link>
			<Link className='navbar-brand' to={ROUTES.PROFILE}>
				Profile
			</Link>
			{!!authUser.roles[ROLES.ADMIN] && (
				<Link className='navbar-brand' to={ROUTES.ADMIN}>
					Admin
				</Link>
			)}
			<Link className='navbar-brand' to='/'>
				<LogoutLink />
			</Link>
		</nav>
	</div>
);

let NavigationNoAuth = () => (
	<div>
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' to={ROUTES.HOME}>
				Home
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
