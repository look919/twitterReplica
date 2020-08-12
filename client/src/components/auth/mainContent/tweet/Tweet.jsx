import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteTweet,
  likeTweet,
  deleteLikeFromTweet,
} from '../../../../actions/tweets';

import moment from 'moment';
import findLinksInText from '../../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';

import AddCommentTweet from './AddCommentTweet';
import HoverTweetBox from './HoverTweetBox';
import ReportBox from './ReportBox';

import {
  Comments,
  Retweets,
  OtherOptions,
  ArrowDown,
} from '../../../../img/Svgs';

const Tweet = ({
  tweet,
  user,
  deleteTweet,
  likeTweet,
  deleteLikeFromTweet,
}) => {
  const [options, setOptions] = useState({
    addCommentChecked: false,
    reportChecked: false,
    reportOption: '',
    tweetLiked: false,
  });
  const likeSvg = useRef(0);
  const likeText = useRef(0);

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
  const onTweetLike = (e) => {
    e.preventDefault();

    if (!tweet.likes.includes(user._id)) {
      likeTweet(tweet);
      likeSvg.current.style.fill = '#e2245e';
      likeText.current.style.color = '#e2245e';
      tweet.likes.push(user._id);

      setOptions({
        ...options,
        tweetLiked: true,
      });
    } else {
      deleteLikeFromTweet(tweet);
      likeSvg.current.style.fill = '#7c8c99';
      likeText.current.style.color = '#7c8c99';
      tweet.likes = tweet.likes.filter((like) => like !== user._id);
      setOptions({
        ...options,
        tweetLiked: false,
      });
    }
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    setOptions({
      ...options,
      reportChecked: false,
      reportOption: e.target.value,
    });
  };

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
          <button
            onClick={(e) => onTweetLike(e)}
            className='tweet__content__option tweet__content__option--red'
          >
            <svg
              ref={likeSvg}
              viewBox='0 0 24 24'
              className='tweet__content__option__icon'
              style={
                tweet.likes.includes(user._id)
                  ? { fill: '#e2245e' }
                  : { fill: 'current' }
              }
            >
              <path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'></path>
            </svg>
            <span
              ref={likeText}
              className='tweet__content__option__amount'
              style={
                tweet.likes.includes(user._id)
                  ? { color: '#e2245e' }
                  : { color: 'current' }
              }
            >
              {tweet.likes.length !== 0 && tweet.likes.length}
            </span>
          </button>
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
  likeTweet: PropTypes.func.isRequired,
  deleteLikeFromTweet: PropTypes.func.isRequired,
};

export default connect(null, { deleteTweet, likeTweet, deleteLikeFromTweet })(
  Tweet
);
