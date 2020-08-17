import axios from 'axios';
import { setAlert } from './alert';

import { FOLLOW_SUCCESS, FOLLOW_FAIL } from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
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
