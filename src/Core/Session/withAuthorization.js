import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './../Firebase/Context';
import * as ROUTES from '../../Core/Routes'
import AuthUserContext from './Context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN)
          }
        },
        () => {
          this.props.history.push(ROUTES.LOGIN)
        }
      )
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;