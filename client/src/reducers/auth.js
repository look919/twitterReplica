import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case ACTIVATION_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload.data.user,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case ACTIVATION_FAIL:
    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:

    default:
      return {
        ...state,
        loading: false,
      };
  }
}
