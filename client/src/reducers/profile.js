import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from '../actions/types';

const initialState = {
  data: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
      return {
        data: payload.data,
        loading: false,
      };
    case GET_PROFILE_FAIL:
      return {
        data: null,
        loading: false,
      };

    default:
      return state;
  }
}
