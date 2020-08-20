import {
  GET_SINGLE_TWEET_SUCCESS,
  GET_SINGLE_TWEET_FAIL,
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
      return {
        tweet: null,
        loading: false,
      };

    default:
      return state;
  }
}
