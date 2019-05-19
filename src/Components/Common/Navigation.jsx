import React from 'react';
import { NavLink } from 'react-router-dom';
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
			<NavLink
				className='navbar-brand'
				activeStyle={{ color: 'red' }}
				to={ROUTES.TRAILERS}
			>
				Trailers
			</NavLink>
			{!!authUser.roles[ROLES.ADMIN] && (
				<NavLink
					className='navbar-brand'
					activeStyle={{ color: 'red' }}
					to={ROUTES.ADMIN}
				>
					Admin page
				</NavLink>
			)}
			<div className='ml-auto'>
				<NavLink
					className='navbar-brand'
					activeStyle={{ color: 'red' }}
					to={ROUTES.PROFILE}
				>
					{authUser.username}
				</NavLink>

				<NavLink className='navbar-brand' to='/'>
					<LogoutLink />
				</NavLink>
			</div>
		</nav>
	</div>
);

let NavigationNoAuth = () => (
	<div>
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<NavLink
				className='navbar-brand'
				activeStyle={{ color: 'red' }}
				to={ROUTES.HOME}
			>
				Home
			</NavLink>
			<div className='ml-auto'>
				<NavLink
					className='navbar-brand'
					activeStyle={{ color: 'red' }}
					to={ROUTES.LOGIN}
				>
					Login
				</NavLink>
				<NavLink
					className='navbar-brand'
					activeStyle={{ color: 'red' }}
					to={ROUTES.REGISTER}
				>
					Register
				</NavLink>
			</div>
		</nav>
	</div>
);

export default Navigation;
