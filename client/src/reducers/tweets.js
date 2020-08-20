import {
  GET_SINGLE_TWEET_SUCCESS,
  GET_SINGLE_TWEET_FAIL,
  GET_TWEETS_SUCCESS,
  GET_TWEETS_FAIL,
  CREATE_TWEET_SUCCESS,
  CREATE_TWEET_FAIL,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAIL,
  DELETE_LIKE_TWEET_SUCCESS,
  DELETE_LIKE_TWEET_FAIL,
  DELETE_TWEET_SUCCESS,
  DELETE_TWEET_FAIL,
} from '../actions/types';

const initialState = {
  loadedTweets: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TWEETS_SUCCESS:
      return {
        ...state,
        loadedTweets: payload.data,
        loading: false,
      };
    case GET_TWEETS_FAIL:
      return {
        ...state,
        loadedTweets: [],
        loading: false,
      };
    case CREATE_TWEET_SUCCESS:
      return {
        ...state,
        loadedTweets: [...state.loadedTweets, payload.data],
        loading: false,
      };
    case DELETE_TWEET_SUCCESS:
      return {
        ...state,
        loadedTweets: state.loadedTweets.filter(
          (tweet) => tweet._id !== payload.data._id
        ),
        loading: false,
      };

    case CREATE_TWEET_FAIL:
    case DELETE_TWEET_FAIL:
    case LIKE_TWEET_SUCCESS:
    case LIKE_TWEET_FAIL:
    case DELETE_LIKE_TWEET_SUCCESS:
    case DELETE_LIKE_TWEET_FAIL:
    default:
      return state;
  }
}
