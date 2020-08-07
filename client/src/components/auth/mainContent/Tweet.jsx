import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import findLinksInText from '../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';
import HoverTweetBox from './HoverTweetBox';

import defaultUser from '../../../img/default_profile.png';
import {
  Comments,
  Retweets,
  Likes,
  OtherOptions,
  ArrowDown,
  SadFace,
  Unfollow,
  Mute,
  Block,
} from '../../../img/Svgs';

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'seconds',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY',
  },
});

const Tweet = ({ tweet }) => {
  const [report, setReport] = useState({
    checked: false,
    option: '',
  });

  const onChange = () => {
    setReport({
      ...report,
      checked: true,
    });

    setTimeout(() => {
      setReport({
        ...report,
        checked: false,
      });
    }, 5000);
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    setReport({
      checked: false,
      option: e.target.value,
    });
  };

  return (
    <div className='mainContent__tweet'>
      <div className='mainContent__tweet__img'>
        {tweet.retweet && (
          <Retweets className='mainContent__tweet__img__retweetIcon' />
        )}
        <img
          src={defaultUser}
          className='mainContent__tweet__img__photo'
          alt='user'
        />
        <HoverTweetBox
          user={tweet.user}
          idClass='mainContent__tweet__img__photo__hover'
        />
      </div>
      <div className='mainContent__tweet__content'>
        {tweet.retweet && (
          <span className='mainContent__tweet__content__retweeted'>
            {tweet.user.name + ' Retweeted'}
          </span>
        )}
        <div className='mainContent__tweet__content__author'>
          <div className='mainContent__tweet__content__author__name'>
            {tweet.user.name}
          </div>
          <HoverTweetBox
            user={tweet.user}
            idClass='mainContent__tweet__content__author__name__hover'
          />

          <span className='mainContent__tweet__content__author__at'>
            {tweet.user.at}
          </span>
          <span className='mainContent__tweet__content__author__dot'>
            {' · '}
          </span>
          <span className='mainContent__tweet__content__author__time'>
            {moment(tweet.createdAt).fromNow()}
          </span>

          <input
            type='checkbox'
            id={tweet._id}
            className='mainContent__tweet__content__author__checkbox'
            value={report}
            onChange={onChange}
          />
          <label
            htmlFor={tweet._id}
            className='mainContent__tweet__content__author__input'
          >
            {!report.checked ? (
              <ArrowDown className='mainContent__tweet__content__author__input__icon' />
            ) : (
              <div className='mainContent__tweet__content__author__box'>
                <button
                  onClick={(e) => onReportOptionChoosed(e)}
                  value='spam'
                  className='mainContent__tweet__content__author__box__btn'
                >
                  <SadFace className='mainContent__tweet__content__author__box__btn__icon' />{' '}
                  Not intrested in this Tweet
                </button>
                <button
                  onClick={(e) => onReportOptionChoosed(e)}
                  className='mainContent__tweet__content__author__box__btn'
                  value='insulting'
                >
                  <Unfollow className='mainContent__tweet__content__author__box__btn__icon' />{' '}
                  Unfollow DefaultUser
                </button>
                <button
                  onClick={(e) => onReportOptionChoosed(e)}
                  value='plagiarism'
                  className='mainContent__tweet__content__author__box__btn'
                >
                  <Mute className='mainContent__tweet__content__author__box__btn__icon' />{' '}
                  Mute DefaultUser
                </button>
                <button
                  onClick={(e) => onReportOptionChoosed(e)}
                  value='lowQuality'
                  className='mainContent__tweet__content__author__box__btn'
                >
                  <Block className='mainContent__tweet__content__author__box__btn__icon' />{' '}
                  Block DefaultUser
                </button>
              </div>
            )}
          </label>
        </div>

        <div className='mainContent__tweet__content__text'>
          <div>{findLinksInText(emoji(tweet.message))}</div>
        </div>
        <div className='mainContent__tweet__content__options'>
          <div className='mainContent__tweet__content__option'>
            <Comments className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              {tweet.comments !== 0 && tweet.comments}
            </span>
          </div>
          <div className='mainContent__tweet__content__option mainContent__tweet__content__option--green'>
            <Retweets className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              {tweet.retweets !== 0 && tweet.retweets}
            </span>
          </div>
          <div className='mainContent__tweet__content__option mainContent__tweet__content__option--red'>
            <Likes className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              {tweet.likes !== 0 && tweet.likes}
            </span>
          </div>
          <div className='mainContent__tweet__content__option'>
            <OtherOptions className='mainContent__tweet__content__option__icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

Tweet.prototype = {
  message: PropTypes.string.isRequired,
};

export default Tweet;
