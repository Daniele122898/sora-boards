import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import AllWaifusPage from '../components/AllWaifusPage';
import PublicRoute from './PublicRoute';
import HomePage from '../components/HomePage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={HomePage} exact={true}/>
        <PublicRoute path="/allwaifus" component={AllWaifusPage} exact={true}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;