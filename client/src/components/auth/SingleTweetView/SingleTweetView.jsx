import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import CreateTweet from './tweet/CreateTweet';
import GetTweet from './GetTweet';

import { GoBack } from '../../../img/Svgs';

const SingleTweetView = ({ auth: { user }, history, paramTweet }) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <main className='singleTweetView'>
      <div className='singleTweetView__header'>
        <div className='singleTweetView__header__content'>
          <button
            className='singleTweetView__header__btn'
            onClick={history.goBack}
          >
            <GoBack className='singleTweetView__header__icon' />
          </button>
          <button
            onClick={scrollToTop}
            className='heading-2 singleTweetView__header__heading'
          >
            Tweet
          </button>
        </div>
      </div>
      <GetTweet user={user} paramTweet={paramTweet} />
    </main>
  );
};

SingleTweetView.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(SingleTweetView));
