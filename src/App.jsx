import React from 'react';
import './App.css';
import Navigation from './Components/Common/Navigation';
import { Route } from 'react-router-dom';
import * as ROUTES from './Core/Routes';

import Home from './Components/Home/Home';
import LoginPage from './Components/Authentication/Login';
import RegisterPage from './Components/Authentication/Register';

function App() {
	return (
		<div>
			<Navigation />
			<Route exact path={ROUTES.HOME} component={Home} />
			<Route path={ROUTES.LOGIN} component={LoginPage} />
			<Route path={ROUTES.REGISTER} component={RegisterPage} />
		</div>
	);
}

export default App;
