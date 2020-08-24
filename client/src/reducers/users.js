import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL } from '../actions/types';

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        data: payload,
        loading: false,
      };
    case GET_ALL_USERS_FAIL:
    default:
      return state;
  }
}
