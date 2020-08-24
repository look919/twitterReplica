import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tweets from './tweets';
import singleTweet from './singleTweet';
import profile from './profile';
import users from './users';

export default combineReducers({
  alert,
  auth,
  tweets,
  singleTweet,
  profile,
  users,
});
