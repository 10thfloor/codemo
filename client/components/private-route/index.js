import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const privateRender = (component, props) => {
  if (Meteor.userId()) {
    return React.createElement(component, props);
  }
  return (
    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  );
};

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => privateRender(component, props)} />
);

export default PrivateRoute;
