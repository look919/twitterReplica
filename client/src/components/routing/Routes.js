import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../nonAuth/LoginPage';
import DevInfo from '../layout/DevInfo';
import NotFoundPage from '../layout/NotFoundPage';
import ExploreNonAuth from '../nonAuth/ExploreNonAuth';
import ExploreAuth from '../auth/HomePage';
import SingleTweet from '../auth/SingleTweetPage';

const App = () => (
  <section className='container'>
    <Switch>
      <Route path='/' component={ExploreNonAuth} exact />
      <Route path='/login' component={LoginPage} exact />
      <Route path='/dev' component={DevInfo} exact />
      <Route
        path='/:at/status/:tweetId'
        render={(props) => <SingleTweet {...props} isAuthed={true} />}
      />
      <PrivateRoute path='/home' component={ExploreAuth} />
      <Route component={NotFoundPage} />
    </Switch>
  </section>
);

export default App;
