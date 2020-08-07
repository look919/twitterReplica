import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../nonAuth/LoginPage';
import DevInfo from '../layout/DevInfo';
import NotFoundPage from '../layout/NotFoundPage';
import ExploreNonAuth from '../nonAuth/ExploreNonAuth';
import ExploreAuth from '../auth/ExploreAuth';

const App = () => (
  <section className='container'>
    <Switch>
      <Route path='/' component={ExploreNonAuth} exact />
      <PrivateRoute path='/home' component={ExploreAuth} />
      <Route path='/login' component={LoginPage} exact />
      <Route path='/dev' component={DevInfo} exact />
      <Route component={NotFoundPage} />
    </Switch>
  </section>
);

export default App;
