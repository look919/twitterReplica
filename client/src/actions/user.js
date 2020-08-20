import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAIL,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//follow
export const getProfile = (paramUser) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users/${paramUser}`);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: err.message,
    });
  }
};

//follow
export const follow = (user) => async (dispatch) => {
  const body = JSON.stringify({ user });

  try {
    const res = await axios.patch('/api/v1/users/follow', body, config);

    dispatch({
      type: FOLLOW_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: FOLLOW_FAIL,
      payload: err.message,
    });
  }
};

export const unFollow = (user) => async (dispatch) => {
  const body = JSON.stringify({ user });

  try {
    const res = await axios.patch('/api/v1/users/unfollow', body, config);

    dispatch({
      type: UNFOLLOW_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: UNFOLLOW_FAIL,
      payload: err.message,
    });
  }
};
