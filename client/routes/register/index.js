import React from 'react';
import { Column } from 'glamor/jsxstyle';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/auth-form';

const buildRegistrationFunction = push => (
  (formData) => {
    Accounts.createUser(formData, (error) => {
      if (error) {
        return console.log(`There was an error: ${error.reason}`);
      }
      return push('/');
    });
  }
);

const Login = ({ push }) => (
  <Column alignItems="center" justifyContent="center" style={{ height: '100%' }}>
    <AuthForm cta="Register" onSubmit={buildRegistrationFunction(push)} />
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </Column>
);

export default Login;
