import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import DailyChart from 'pages/DailyChart';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';

const isAuthenticated = !!localStorage.getItem('auth-token');

const defaultProtectedRouteProps: ProtectedRouteProps = {
  isAuthenticated,
  authenticationPath: '/login',
};

const Router = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <ProtectedRoute exact path="/stockchart" component={DailyChart} {...defaultProtectedRouteProps} />
    <ProtectedRoute path="/stockchart/:stock" component={DailyChart} {...defaultProtectedRouteProps} />
    <Redirect to="/" />
  </Switch>
);

export default Router;
