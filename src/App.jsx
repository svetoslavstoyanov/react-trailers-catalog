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

let App = () => (
	<div>
		<Navigation />
		<Notifications options={{ top: '60px', timeout: 2000 }} />

		<Route exact path={ROUTES.HOME} component={Home} />
		<Route path={ROUTES.LOGIN} component={LoginPage} />
		<Route path={ROUTES.REGISTER} component={RegisterPage} />
	</div>
);
export default withAuthentication(App);
