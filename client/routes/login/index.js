import React from 'react';
import { Column } from 'glamor/jsxstyle';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/auth-form';

const buildLoginFunction = push => (
  ({ username, password }) => {
    console.log(username, password);
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        return console.log(`There was an error: ${error.reason}`);
      }
      return push('/');
    });
  }
);

const Login = ({ push }) => (
  <Column alignItems="center" justifyContent="center" style={{ height: '100%' }}>
    <AuthForm cta="Login" onSubmit={buildLoginFunction(push)} />
    <p>Don't have an account? <Link to="/register">Create One</Link></p>
  </Column>
);

export default Login;
