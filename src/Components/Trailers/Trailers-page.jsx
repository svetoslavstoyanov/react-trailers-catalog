import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../../Core/Session';

class TrailersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser => (
					<div>
						<p>{authUser.email}</p>
						<p>trailers</p>
					</div>
				)}
			</AuthUserContext.Consumer>
		);
	}
}

let condition = authUser => !!authUser;

export default withAuthorization(condition)(TrailersPage);
