import axios from 'axios';
import moment from 'moment';
import { setAlert } from './alert';

import {
  GET_TWEETS_SUCCESS,
  GET_TWEETS_FAIL,
  CREATE_TWEET_SUCCESS,
  CREATE_TWEET_FAIL,
  DELETE_TWEET_SUCCESS,
  DELETE_TWEET_FAIL,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAIL,
  DELETE_LIKE_TWEET_SUCCESS,
  DELETE_LIKE_TWEET_FAIL,
  RETWEET_SUCCESS,
  RETWEET_FAIL,
  DELETE_RETWEET_SUCCESS,
  DELETE_RETWEET_FAIL,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getTweets = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/tweets`);

    dispatch({
      type: GET_TWEETS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem while loading tweets', 'danger'));
    console.log(err.response);
    dispatch({
      type: GET_TWEETS_FAIL,
      payload: err.message,
    });
  }
};
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
  formData.append('createdAt', moment());
  if (retweet) formData.append('retweet', retweet);
  if (ref) formData.append('ref', ref);
  if (imgOrGif) formData.append('imgOrGif', imgOrGif);

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }

  try {
    const res = await axios.post('/api/v1/tweets', formData, config);

    dispatch({
      type: CREATE_TWEET_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem while creating tweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: CREATE_TWEET_FAIL,
      payload: err.message,
    });
  }
};

export const deleteTweet = (user, tweetId) => async (dispatch) => {
  const body = JSON.stringify({ user, tweetId });

  try {
    const res = await axios.patch(`/api/v1/tweets/${tweetId}`, body, config);

    dispatch({
      type: DELETE_TWEET_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem while deleting tweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: DELETE_TWEET_FAIL,
      payload: err.message,
    });
  }
};
export const retweet = (tweet) => async (dispatch) => {
  const body = JSON.stringify({ tweet });

  try {
    const res = await axios.patch(
      `/api/v1/tweets/${tweet._id}/retweet`,
      body,
      config
    );

    dispatch({
      type: RETWEET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem with retweeting', 'danger'));
    console.log(err.response);
    dispatch({
      type: RETWEET_FAIL,
      payload: err.message,
    });
  }
};
export const deleteRetweet = (tweet) => async (dispatch) => {
  const body = JSON.stringify({ tweet });

  try {
    const res = await axios.patch(
      `/api/v1/tweets/${tweet._id}/delete-retweet`,
      body,
      config
    );

    dispatch({
      type: DELETE_RETWEET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem with deleting retweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: DELETE_RETWEET_FAIL,
      payload: err.message,
    });
  }
};

export const likeTweet = (tweet) => async (dispatch) => {
  const body = JSON.stringify({ tweet });

  try {
    const res = await axios.patch(
      `/api/v1/tweets/${tweet._id}/like`,
      body,
      config
    );

    dispatch({
      type: LIKE_TWEET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem with liking tweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: LIKE_TWEET_FAIL,
      payload: err.message,
    });
  }
};
export const deleteLikeFromTweet = (tweet) => async (dispatch) => {
  const body = JSON.stringify({ tweet });

  try {
    const res = await axios.patch(
      `/api/v1/tweets/${tweet._id}/delete-like`,
      body,
      config
    );

    dispatch({
      type: DELETE_LIKE_TWEET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('There was a problem with unliking tweet', 'danger'));
    console.log(err.response);
    dispatch({
      type: DELETE_LIKE_TWEET_FAIL,
      payload: err.message,
    });
  }
};
