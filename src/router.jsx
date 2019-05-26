import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';
import PrivateRoute from './shared/components/Auth/PrivateRoute';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import Dashboard from './containers/Dashboard';
import NotFound from './components/NotFound';

const routes = () => (
  <App>
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/settings" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </App>
);

export default hot(routes);
