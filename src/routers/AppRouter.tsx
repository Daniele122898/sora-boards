import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import NotFoundPage from '../components/Pages/NotFoundPage';
import AllWaifusPage from '../components/Pages/AllWaifusPage';
import UserWaifusPage from '../components/Pages/UserWaifusPage';
import PublicRoute from './PublicRoute';
import HomePage from '../components/Pages/HomePage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={HomePage} exact={true}/>
        <PublicRoute path="/allwaifus" component={AllWaifusPage} exact={true}/>
        <PublicRoute path="/userwaifus/:id" component={UserWaifusPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;