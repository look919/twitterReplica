import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tweets from './tweets';

export default combineReducers({ alert, auth, tweets });
