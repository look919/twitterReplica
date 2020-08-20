import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tweets from './tweets';
import singleTweet from './singleTweet';
import profile from './profile';

export default combineReducers({ alert, auth, tweets, singleTweet, profile });
