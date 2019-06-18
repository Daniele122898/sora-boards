import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header'

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => (
  <Route {...rest} component={(props: any)=> (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to={"/"} />
    )
  )}/>
);



export default PrivateRoute;