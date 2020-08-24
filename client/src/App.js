import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExploreNonAuth from './components/nonAuth/ExploreNonAuth';
import Routes from './components/routing/Routes';
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { getAllUsers } from './actions/user';
import setAuthToken from './utils/setAuthToken';
import moment from 'moment';

import './styles/main.scss';

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'now',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1 month',
    MM: '%dM',
    y: '1 year',
    yy: '%dY',
  },
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllUsers());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path='/' component={ExploreNonAuth} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
