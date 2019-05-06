import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Core/Routes';

const Navigation = () => (
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
