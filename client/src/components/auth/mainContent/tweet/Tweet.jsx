import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTweet } from '../../../../actions/tweets';

import moment from 'moment';
import findLinksInText from '../../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';

import AddCommentTweet from './AddCommentTweet';
import HoverTweetBox from './HoverTweetBox';
import ReportBox from './ReportBox';

import {
  Comments,
  Retweets,
  Likes,
  OtherOptions,
  ArrowDown,
} from '../../../../img/Svgs';

const Tweet = ({ tweet, user, deleteTweet }) => {
  const [options, setOptions] = useState({
    addCommentChecked: false,
    reportChecked: false,
    reportOption: '',
  });

  const addComment = () => {
    setOptions({
      ...options,
      addCommentChecked: true,
    });
  };
  const closeModal = () =>
    setOptions({
      ...options,
      addCommentChecked: false,
    });

  const onReportChange = () => {
    setOptions({
      ...options,
      reportChecked: true,
    });
  };
  const onTweetDelete = (e) => {
    e.preventDefault();
    deleteTweet(user._id, tweet._id);
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    setOptions({
      ...options,
      reportChecked: false,
      reportOption: e.target.value,
    });
  };
  console.log(tweet);
  return (
    <div className='tweet'>
      <div className='tweet__img'>
        {tweet.retweet && <Retweets className='tweet__img__retweetIcon' />}
        <img src={tweet.user.photo} className='tweet__img__photo' alt='user' />
        <HoverTweetBox user={tweet.user} idClass='tweet__img__photo__hover' />
      </div>
      <div className='tweet__content'>
        {tweet.retweet && (
          <span className='tweet__content__retweeted'>
            {tweet.user.name + ' Retweeted'}
          </span>
        )}
        <div className='tweet__content__author'>
          <span className='tweet__content__author__name'>
            {tweet.user.name}
          </span>
          <HoverTweetBox
            user={tweet.user}
            idClass='tweet__content__author__name__hover'
          />
          <span className='tweet__content__author__at'>{tweet.user.at}</span>
          <span className='tweet__content__author__dot'>{' · '}</span>
          <span className='tweet__content__author__time'>
            {moment(tweet.createdAt).fromNow()}
          </span>
          <input
            type='checkbox'
            id={tweet._id}
            className='tweet__content__author__checkbox'
            onChange={onReportChange}
          />
          <label htmlFor={tweet._id} className='tweet__content__author__input'>
            {!options.reportChecked ? (
              <ArrowDown className='tweet__content__author__input__icon' />
            ) : user._id === tweet.user._id ? (
              <ReportBox
                eventListener={onReportOptionChoosed}
                deleteFunc={onTweetDelete}
                del={true}
              />
            ) : (
              <ReportBox eventListener={onReportOptionChoosed} />
            )}
          </label>
        </div>

        <div className='tweet__content__text'>
          <div>{findLinksInText(emoji(tweet.message))}</div>
        </div>
        <div className='tweet__content__options'>
          <button onClick={addComment} className='tweet__content__option'>
            <Comments className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.comments.length !== 0 && tweet.comments.length}
            </span>
          </button>
          <AddCommentTweet
            isOpen={options.addCommentChecked}
            closeModal={closeModal}
            tweet={tweet}
          />
          <div className='tweet__content__option tweet__content__option--green'>
            <Retweets className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.retweets.length !== 0 && tweet.retweets.length}
            </span>
          </div>
          <div className='tweet__content__option tweet__content__option--red'>
            <Likes className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.likes.length !== 0 && tweet.likes.length}
            </span>
          </div>
          <div className='tweet__content__option'>
            <OtherOptions className='tweet__content__option__icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  deleteTweet: PropTypes.func.isRequired,
};

export default connect(null, { deleteTweet })(Tweet);
