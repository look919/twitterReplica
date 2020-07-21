import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

// import { loadUser } from '../actions/auth';

// import setAuthToken from './../utils/setAuthToken';
import Alert from './layout/Alert';
import MainPage from './MainPage.jsx';

import '../styles/main.scss';

const App = () => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  //   store.dispatch(loadUser());
  // }
  // useEffect(() => {
  //   store.dispatch(getAllProducts());
  //   store.dispatch(getCartItems());
  // }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Alert />
          <Switch>
            <Route path='/' component={MainPage} exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
