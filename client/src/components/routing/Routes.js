import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../nonAuth/LoginPage';
import DevInfo from '../layout/DevInfo';
import NotFoundPage from '../layout/NotFoundPage';
import ExploreNonAuth from '../nonAuth/ExploreNonAuth';
import HomePage from '../auth/HomePage';
import SingleTweetPage from '../auth/SingleTweetPage';
import ProfilePage from '../auth/ProfilePage.jsx';
import EditProfilePage from '../auth/EditProfilePage';

const App = () => (
  <section className='container'>
    <Switch>
      <Route path='/' component={ExploreNonAuth} exact />
      <Route path='/login' component={LoginPage} exact />
      <Route path='/dev' component={DevInfo} exact />
      <PrivateRoute path='/home' component={HomePage} />

      <PrivateRoute
        path='/:at/status/:tweetId'
        render={(props) => <SingleTweetPage {...props} isAuthed={true} />}
        component={SingleTweetPage}
      />
      <PrivateRoute
        path='/edit/:userAt'
        render={(props) => <EditProfilePage {...props} isAuthed={true} />}
        component={EditProfilePage}
      />
      <PrivateRoute
        path='/:userAt'
        render={(props) => <ProfilePage {...props} isAuthed={true} />}
        component={ProfilePage}
        exact
      />

      <Route component={NotFoundPage} />
    </Switch>
  </section>
);

export default App;