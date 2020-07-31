import React, { useState } from 'react';
import PropTypes from 'prop-types';

import emoji from 'react-easy-emoji';

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
        {tweet.reTweet && (
          <Retweets className='mainContent__tweet__img__retweetIcon' />
        )}
        <img
          src={defaultUser}
          className='mainContent__tweet__img__photo'
          alt='user'
        />
      </div>
      <div className='mainContent__tweet__content'>
        {tweet.reTweet && (
          <span className='mainContent__tweet__content__retweeted'>
            {tweet.user + ' Retweeted'}
          </span>
        )}
        <div className='mainContent__tweet__content__author'>
          <span className='mainContent__tweet__content__author__name'>
            {tweet.user}
          </span>
          <span className='mainContent__tweet__content__author__at'>
            @defaultUser
          </span>
          <span className='mainContent__tweet__content__author__dot'>
            {' · '}
          </span>
          <span className='mainContent__tweet__content__author__time'>2h</span>

          <input
            type='checkbox'
            id={tweet.id}
            className='mainContent__tweet__content__author__checkbox'
            value={report}
            onChange={onChange}
          />
          <label
            htmlFor={tweet.id}
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
          <div>{emoji(tweet.message)}</div>
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
