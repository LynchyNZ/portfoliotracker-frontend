import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  let redirectPath = '';
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;