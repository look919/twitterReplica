import React, { useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteTweet,
  retweet,
  deleteRetweet,
  likeTweet,
  deleteLikeFromTweet,
} from '../../../../actions/tweets';

import moment from 'moment';
import findLinksInText from '../../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';

import AddCommentTweet from './AddCommentTweet';
import HoverTweetBox from './HoverTweetBox';
import ReportBox from './ReportBox';

import { useMediaQuery } from 'react-responsive';

import {
  Comments,
  Retweets,
  OtherOptions,
  ArrowDown,
  LikesFilled,
} from '../../../../img/Svgs';

const Tweet = ({
  tweet,
  user,
  deleteTweet,
  retweet,
  deleteRetweet,
  likeTweet,
  deleteLikeFromTweet,
  history,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const [options, setOptions] = useState({
    addCommentChecked: false,
    reportChecked: false,
    reportOption: '',
    tweetLiked: false,
    tweetRetweeted: false,
    hoverBoxText: 'none',
    hoverBoxImg: 'none',
  });

  const likeSvg = useRef(0);
  const likeText = useRef(0);
  const retweetSvg = useRef(0);
  const retweetText = useRef(0);

  const addComment = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setOptions({
      ...options,
      addCommentChecked: true,
    });
  };
  const closeModal = (e) => {
    e.stopPropagation();

    setOptions({
      ...options,
      addCommentChecked: false,
    });
  };

  const onReportChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setOptions({
      ...options,
      reportChecked: true,
    });
  };
  const onTweetDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    deleteTweet(user._id, tweet._id);
  };
  const onTweetLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
  const onRetweetClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!tweet.retweets.includes(user._id)) {
      retweet(tweet);

      retweetSvg.current.style.fill = '#17bf63';
      retweetText.current.style.color = '#17bf63';
      tweet.retweets.push(user._id);

      setOptions({
        ...options,
        tweetRetweeted: true,
      });
    } else {
      deleteRetweet(tweet);
      retweetSvg.current.style.fill = '#7c8c99';
      retweetSvg.current.style.color = '#7c8c99';

      tweet.retweets = tweet.retweets.filter((retweet) => retweet !== user._id);

      setOptions({
        ...options,
        tweetRetweeted: false,
      });
    }
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOptions({
      ...options,
      reportChecked: false,
      reportOption: e.target.value,
    });
  };
  const onHoverName = () => {
    let unmounted = false;

    if (options.hoverBoxText === 'none') {
      setOptions({
        ...options,
        hoverBoxText: 'flex',
      });
      if (!unmounted) {
        setTimeout(() => {
          setOptions({
            ...options,
            hoverBoxImg: 'none',
          });
        }, 100);
      }
    } else {
      if (!unmounted) {
        setTimeout(() => {
          setOptions({
            ...options,
            hoverBoxText: 'none',
          });
        }, 100);
      }
    }

    return () => {
      unmounted = true;
    };
  };
  const onHoverImg = () => {
    let unmounted = false;

    if (options.hoverBoxImg === 'none') {
      setOptions({
        ...options,
        hoverBoxImg: 'flex',
      });
    } else {
      if (!unmounted) {
        setTimeout(() => {
          setOptions({
            ...options,
            hoverBoxImg: 'none',
          });
        }, 100);
      }
    }
  };
  const onTweetClicked = (e) => {
    e.stopPropagation();

    if (e.target.id === 'tweetRedirect') {
      return history.push(`/${tweet.user.at}/status/${tweet._id}`);
    } else if (e.target.id === 'tweetImgRedirect') {
      return history.push(`/${tweet.user.at}/status/${tweet._id}/photo`);
    } else {
      return;
    }
  };

  return (
    <div
      onClick={(e) => onTweetClicked(e)}
      className='tweet'
      id='tweetRedirect'
    >
      <div className='tweet__img' id='tweetRedirect'>
        {tweet.retweet && <Retweets className='tweet__img__icon' />}
        {tweet.liked && <LikesFilled className='tweet__img__icon' />}
        <Link to={`/${tweet.user.at}`}>
          <img
            src={tweet.user.photo}
            className='tweet__img__photo'
            alt='user'
            onMouseEnter={onHoverImg}
            onMouseLeave={onHoverImg}
          />
        </Link>
        {!isMobile && (
          <HoverTweetBox
            user={tweet.user}
            idClass='tweet__img__photo__hover'
            styles={{ display: `${options.hoverBoxImg}` }}
          />
        )}
      </div>
      <div className='tweet__content' id='tweetRedirect'>
        {tweet.retweet && (
          <Link
            to={`/${tweet.actionUserAt}`}
            className='tweet__content__retweeted'
          >
            {tweet.actionUserName + ' Retweeted'}
          </Link>
        )}
        {tweet.liked && (
          <span className='tweet__content__retweeted'>
            {tweet.actionUserName + ' liked'}
          </span>
        )}
        <div
          className='tweet__content__author'
          name='tweetRedirect'
          id='tweetRedirect'
        >
          <Link
            to={`/${tweet.user.at}`}
            className='tweet__content__author__name'
            onMouseEnter={onHoverName}
            onMouseLeave={onHoverName}
          >
            {tweet.user.name}
          </Link>
          {!isMobile && (
            <HoverTweetBox
              styles={{ display: `${options.hoverBoxText}` }}
              user={tweet.user}
              idClass='t1VznyypTWrzvnje2KeKD12USGUkQ6P1erD'
            />
          )}

          <span className='tweet__content__author__at'>{tweet.user.at}</span>
          <span className='tweet__content__author__dot'>{' · '}</span>
          <span className='tweet__content__author__time'>
            {moment(tweet.createdAt).fromNow()}
          </span>
          {!options.reportChecked ? (
            <button
              id={
                retweet
                  ? tweet._id + tweet.actionUserName
                  : tweet._id + tweet.actionUserAt
              }
              className='tweet__content__author__btn'
              onClick={(e) => onReportChange(e)}
            >
              <ArrowDown className='tweet__content__author__btn__icon' />
            </button>
          ) : user._id === tweet.user._id ? (
            <ReportBox
              eventListener={onReportOptionChoosed}
              deleteFunc={onTweetDelete}
              del={true}
            />
          ) : (
            <ReportBox eventListener={onReportOptionChoosed} />
          )}
        </div>
        <div className='tweet__content__message' id='tweetRedirect'>
          <div id='tweetRedirect' className='tweet__content__message__text'>
            <div id='tweetRedirect'>
              {findLinksInText(emoji(tweet.message))}
            </div>
          </div>
          {tweet.imgOrGif && tweet.imgOrGif.startsWith('https://') && (
            <img
              src={tweet.imgOrGif}
              className='tweet__content__message__img'
              alt='user input data'
              id='tweetImgRedirect'
            />
          )}
          {tweet.imgOrGif && !tweet.imgOrGif.startsWith('https://') && (
            <img
              src={`https://media.giphy.com/media/${tweet.imgOrGif}/giphy.gif`}
              className='tweet__content__message__img'
              alt='user input data'
              id='tweetImgRedirect'
            />
          )}
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
          <button
            onClick={(e) => onRetweetClicked(e)}
            className='tweet__content__option tweet__content__option--green'
          >
            <svg
              viewBox='0 0 24 24'
              ref={retweetSvg}
              className='tweet__content__option__icon'
              style={
                tweet.retweets.includes(user._id)
                  ? { fill: '#17bf63' }
                  : { fill: '#7c8c99' }
              }
            >
              <path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path>
            </svg>
            <span
              className='tweet__content__option__amount'
              ref={retweetText}
              style={
                tweet.retweets.includes(user._id)
                  ? { color: '#17bf63' }
                  : { color: '#7c8c99' }
              }
            >
              {tweet.retweets.length !== 0 && tweet.retweets.length}
            </span>
          </button>
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
                  : { fill: '#7c8c99' }
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
                  : { color: '#7c8c99' }
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
      {tweet.ref &&
        typeof tweet.ref === 'object' &&
        tweet.user._id === user._id && (
          <Link
            to={`/${tweet.ref.user.at}/status/${tweet.ref._id}`}
            className='tweet__ref'
          >
            Show this thread
          </Link>
        )}
    </div>
  );
};

Tweet.propTypes = {
  user: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  deleteTweet: PropTypes.func.isRequired,
  likeTweet: PropTypes.func.isRequired,
  deleteLikeFromTweet: PropTypes.func.isRequired,
  retweet: PropTypes.func.isRequired,
  deleteRetweet: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, {
    deleteTweet,
    retweet,
    deleteRetweet,
    likeTweet,
    deleteLikeFromTweet,
  })(Tweet)
);
