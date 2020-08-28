import {
  GET_SINGLE_TWEET_SUCCESS,
  GET_SINGLE_TWEET_FAIL,
  GET_TWEETS_SUCCESS,
  GET_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  tweet: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_TWEET_SUCCESS:
      return {
        tweet: payload.data,
        loading: false,
      };

    case GET_SINGLE_TWEET_FAIL:
    case GET_TWEETS_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
