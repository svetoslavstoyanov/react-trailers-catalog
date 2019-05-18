import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../../Core/Session';

class ProfileTrailersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser => (
					<div>
						<p>{authUser.username}</p>
						<p>profile page</p>
					</div>
				)}
			</AuthUserContext.Consumer>
		);
	}
}

let condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfileTrailersPage);
