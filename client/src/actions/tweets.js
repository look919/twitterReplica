import axios from 'axios';
import { setAlert } from './alert';

import { CREATE_TWEET_SUCCESS, CREATE_TWEET_FAIL } from './types';

export const createTweet = ({
  userId,
  message,
  imgOrGif,
  retweet,
  ref,
}) => async (dispatch) => {
  const formData = new FormData();
  formData.append('user', userId);
  formData.append('message', message);
  formData.append('retweet', retweet);
  if (retweet) formData.append('ref', ref);
  if (imgOrGif) formData.append('imgOrGif', imgOrGif);

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/v1/tweets', formData, config);

    dispatch({
      type: CREATE_TWEET_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Tweet created successfully', 'success'));
  } catch (err) {
    dispatch(setAlert('There was a problem while creating tweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: CREATE_TWEET_FAIL,
      payload: err.message,
    });
  }
};
