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
    case GET_TWEETS_SUCCESS:
      return {
        loadedTweets: payload.data,
        loading: false,
      };
    case GET_TWEETS_FAIL:
      return {
        loadedTweets: [],
        loading: false,
      };
    case CREATE_TWEET_SUCCESS:
      return {
        ...state,
        //loadedTweets: [payload.data.data, ...state.loadedTweets],
        loading: false,
      };

    case DELETE_LIKE_TWEET_SUCCESS:
      return {
        ...state,
        // loadedTweets: state.loadedTweets.filter(
        //   (tweet) => tweet._id !== payload.data.data
        // ),
        loading: false,
      };
    case CREATE_TWEET_FAIL:
    case LIKE_TWEET_SUCCESS:
    case LIKE_TWEET_FAIL:
    case DELETE_LIKE_TWEET_FAIL:
    default:
      return state;
  }
}
