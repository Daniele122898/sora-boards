import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route {...rest} component={(props: any)=> (
      <Component {...props} />
  )}/>
);

export default PublicRoute;