import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import NotFound from './components/NotFound';

const routes = () => (
  <App>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </App>
);

export const Routes = hot(routes);
