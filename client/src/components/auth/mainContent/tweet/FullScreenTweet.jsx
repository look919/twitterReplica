import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleTweet } from '../../../../actions/tweets.js';
import { v4 as uuidv4 } from 'uuid';

import Tweet from './Tweet';
import Modal from 'react-modal';
import { Exit } from '../../../../img/Svgs';
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
  user,
  getSingleTweet,
  fullScreen,
  close,
}) => {
  useEffect(() => {
    getSingleTweet(tweetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!tweet || loading) return null;

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
      {loading ? (
        <img
          src={LoadingGif}
          className='loading tweet__fullscreen__loading'
          alt='loading...'
        />
      ) : tweet.imgOrGif.startsWith('https://') ? (
        <img
          src={tweet.imgOrGif}
          className='tweet__fullscreen__img'
          alt='tweet img'
        />
      ) : (
        !tweet.imgOrGif.startsWith('https://') && (
          <img
            src={`https://media.giphy.com/media/${tweet.imgOrGif}/giphy.gif`}
            className='tweet__fullscreen__img'
            alt='tweet gif'
          />
        )
      )}
      <section className='tweet__fullscreen__content'>
        <Tweet
          tweet={tweet}
          user={user}
          key={uuidv4()}
          displayedFullScreen={true}
        />

        {tweet.comments.length > 0 &&
          tweet.comments.map((tweet) => (
            <Tweet tweet={tweet} user={user} key={uuidv4()} />
          ))}
      </section>
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
