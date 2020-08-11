import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTweet } from '../../../actions/tweets';

import moment from 'moment';
import findLinksInText from '../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';

import HoverTweetBox from './HoverTweetBox';
import ReportBox from './ReportBox';

import defaultUser from '../../../img/default_profile.png';
import {
  Comments,
  Retweets,
  Likes,
  OtherOptions,
  ArrowDown,
} from '../../../img/Svgs';

const Tweet = ({ tweet, user, deleteTweet }) => {
  const [report, setReport] = useState({
    checked: false,
    option: '',
  });

  const onChange = () => {
    setReport({
      ...report,
      checked: true,
    });
  };
  const onTweetDelete = async (e) => {
    e.preventDefault();

    await deleteTweet(user._id, tweet._id);
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    setReport({
      checked: false,
      option: e.target.value,
    });
  };
  return (
    <div className='tweet'>
      <div className='tweet__img'>
        {tweet.retweet && <Retweets className='tweet__img__retweetIcon' />}
        <img src={defaultUser} className='tweet__img__photo' alt='user' />
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
            value={report}
            onChange={onChange}
          />
          <label htmlFor={tweet._id} className='tweet__content__author__input'>
            {!report.checked ? (
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
          <div className='tweet__content__option'>
            <Comments className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.comments !== 0 && tweet.comments}
            </span>
          </div>
          <div className='tweet__content__option tweet__content__option--green'>
            <Retweets className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.retweets !== 0 && tweet.retweets}
            </span>
          </div>
          <div className='tweet__content__option tweet__content__option--red'>
            <Likes className='tweet__content__option__icon' />
            <span className='tweet__content__option__amount'>
              {tweet.likes !== 0 && tweet.likes}
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
