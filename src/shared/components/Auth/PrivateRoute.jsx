import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import fakeAuth from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    fakeAuth.hasSession() ?
      (<Component {...props} />) :
      (<Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />)
    }
  />
);

export default PrivateRoute;
