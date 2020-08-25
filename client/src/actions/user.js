import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//follow
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/v1/users?fields=name,at,photo,following,followers`
    );

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: err.message,
    });
  }
};

//follow
export const getProfile = (paramUser) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users/${paramUser}`);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: err.message,
    });
  }
};

//update user
export const updateUser = ({
  name,
  photo,
  backgroundImage,
  description,
  city,
  link,
}) => async (dispatch) => {
  const formData = new FormData();
  if (name) formData.append('name', name);
  if (photo) formData.append('photo', photo);
  if (backgroundImage) formData.append('backgroundImage', backgroundImage);
  if (description) formData.append('description', description);
  if (city) formData.append('city', city);
  if (link) formData.append('link', link);

  try {
    const res = await axios.patch('/api/v1/users/updateMe', formData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data.data.user,
    });
    dispatch(setAlert('Profile updated', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: UPDATE_USER_FAIL,
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
    dispatch(setAlert(`${user.name} followed`, 'success', 1500));
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
    dispatch(setAlert(`${user.name} unfollowed`, 'success', 1500));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));
    dispatch({
      type: UNFOLLOW_FAIL,
      payload: err.message,
    });
  }
};
