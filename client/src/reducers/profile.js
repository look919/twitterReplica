import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_TWEETS_SUCCESS,
  SET_INITIAL_STATE,
} from '../actions/types';

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        data: payload,
        loading: false,
      };
    case GET_PROFILE_FAIL:
      return {
        data: null,
        loading: false,
      };

    case GET_TWEETS_SUCCESS:
    case SET_INITIAL_STATE:
      return initialState;
    case UPDATE_USER_FAIL:
    default:
      return state;
  }
}
