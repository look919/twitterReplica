import {
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAIL,
  DELETE_LIKE_TWEET_SUCCESS,
  DELETE_LIKE_TWEET_FAIL,
} from '../actions/types';

const initialState = {
  loadedTweets: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIKE_TWEET_SUCCESS:
    case LIKE_TWEET_FAIL:
    case DELETE_LIKE_TWEET_SUCCESS:
    case DELETE_LIKE_TWEET_FAIL:
    default:
      return state;
  }
}
