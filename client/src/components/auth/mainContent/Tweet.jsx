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

const Tweet = ({ message = 'test' }) => {
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
        <img
          src={defaultUser}
          className='mainContent__tweet__img__photo'
          alt='user'
        />
      </div>
      <div className='mainContent__tweet__content'>
        <div className='mainContent__tweet__content__author'>
          <span className='mainContent__tweet__content__author__name'>
            DefaultUser
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
            id='test'
            className='mainContent__tweet__content__author__checkbox'
            value={report}
            onChange={onChange}
          />
          <label
            htmlFor={'test'}
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
          <div>{emoji(message)}</div>
        </div>
        <div className='mainContent__tweet__content__options'>
          <div className='mainContent__tweet__content__option'>
            <Comments className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              7
            </span>
          </div>
          <div className='mainContent__tweet__content__option'>
            <Retweets className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              2
            </span>
          </div>
          <div className='mainContent__tweet__content__option'>
            <Likes className='mainContent__tweet__content__option__icon' />
            <span className='mainContent__tweet__content__option__amount'>
              43
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
