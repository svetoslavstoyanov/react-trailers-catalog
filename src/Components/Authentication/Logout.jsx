import React from 'react';
import { withFirebase } from './../../Core/Firebase/Context';

let LogoutLink = ({ firebase }) => (
	<span onClick={firebase.logoutUser}>Logout</span>
);

export default withFirebase(LogoutLink);
