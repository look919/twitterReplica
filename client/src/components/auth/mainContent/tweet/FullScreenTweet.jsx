import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleTweet } from '../../../../actions/tweets.js';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';

import SingleTweet from '../../SingleTweetView/SingleTweet';
import Tweet from './Tweet';
import Modal from 'react-modal';
import { Exit, Settings } from '../../../../img/Svgs';
import LoadingGif from '../../../../img/loading.gif';

//modal styles
const customStyles = {
  content: {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
};

const FullScreenTweet = ({
  tweetId,
  singleTweet: { loading, tweet },
  defaultTweet,
  user,
  getSingleTweet,
  fullScreen,
  close,
}) => {
  useEffect(() => {
    getSingleTweet(tweetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [optionsOpened, setOptionsOpened] = useState(false);
  const isMobileOrIPad = useMediaQuery({ query: '(max-width: 1020px)' });

  const handleOpenOptions = (e) => {
    e.preventDefault();
    setOptionsOpened(true);
  };
  const handleCloseOptions = (e) => {
    e.preventDefault();
    setOptionsOpened(false);
  };

  if (!fullScreen || !defaultTweet) return null;
  else if (!tweet || loading) tweet = defaultTweet;

  return (
    <Modal
      isOpen={fullScreen}
      onRequestClose={close}
      style={customStyles}
      contentLabel='Fullscreen Modal'
      ariaHideApp={false}
      className='tweet__fullscreen'
    >
      <button onClick={close} className='tweet__fullscreen__closeBtn'>
        <Exit className='tweet__fullscreen__closeBtn__icon' />
      </button>
      <button
        onClick={handleOpenOptions}
        className='tweet__fullscreen__settings tweet__fullscreen__settings--mobile'
      >
        <Settings className='tweet__fullscreen__settings__icon' />
      </button>
      {optionsOpened && (
        <div className='tweet__fullscreen__settings__box'>
          <Link
            to={`/${tweet.user.at}/status/${tweet._id}`}
            className='tweet__fullscreen__settings__box__link'
          >
            View Tweet
          </Link>
          <button
            onClick={handleCloseOptions}
            className='btn tweet__fullscreen__settings__box__cancel'
          >
            Cancel
          </button>
        </div>
      )}
      {loading ? (
        <img
          src={LoadingGif}
          className='loading tweet__fullscreen__loading'
          alt='loading...'
        />
      ) : tweet.imgOrGif && tweet.imgOrGif.startsWith('https://') ? (
        <img
          src={tweet.imgOrGif}
          className='tweet__fullscreen__img'
          alt='tweet img'
        />
      ) : (
        tweet.imgOrGif &&
        !tweet.imgOrGif.startsWith('https://') && (
          <img
            src={`https://media.giphy.com/media/${tweet.imgOrGif}/giphy.gif`}
            className='tweet__fullscreen__gif'
            alt='tweet gif'
          />
        )
      )}
      {!isMobileOrIPad && (
        <section className='tweet__fullscreen__content'>
          <SingleTweet
            tweet={tweet}
            user={user}
            key={uuidv4()}
            displayedFullScreen={true}
          />
          {!loading &&
            tweet.comments.length > 0 &&
            tweet.comments.map((tweet) => (
              <Tweet tweet={tweet} user={user} key={uuidv4()} />
            ))}
        </section>
      )}
    </Modal>
  );
};

FullScreenTweet.propTypes = {
  getSingleTweet: PropTypes.func.isRequired,
  singleTweet: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  singleTweet: state.singleTweet,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getSingleTweet })(FullScreenTweet);
