import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as ROUTES from './Core/Routes';
import Notifications from 'react-notify-toast';
import withAuthentication from './Core/Session/withAuthentication';

import Navigation from './Components/Common/Navigation';
import Home from './Components/Home/Home';
import LoginPage from './Components/Authentication/Login';
import RegisterPage from './Components/Authentication/Register';
import ProfileTrailersPage from './Components/Trailers-favorite/Trailers-profile-favorite';
import TrailersPage from './Components/Trailers/Trailers-page';
import AdminPage from './Components/Admin/Admin';

let App = () => (
	<div>
		<Navigation />
		<Notifications options={{ top: '60px', timeout: 2000 }} />

		<Route exact path={ROUTES.HOME} component={Home} />
		<Route path={ROUTES.LOGIN} component={LoginPage} />
		<Route path={ROUTES.REGISTER} component={RegisterPage} />
		<Route path={ROUTES.PROFILE} component={ProfileTrailersPage} />
		<Route path={ROUTES.TRAILERS} component={TrailersPage} />
		<Route path={ROUTES.ADMIN} component={AdminPage} />
	</div>
);
export default withAuthentication(App);
