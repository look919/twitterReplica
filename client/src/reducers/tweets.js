import { CREATE_TWEET_SUCCESS, CREATE_TWEET_FAIL } from '../actions/types';

const initialState = {
  loadedTweets: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
