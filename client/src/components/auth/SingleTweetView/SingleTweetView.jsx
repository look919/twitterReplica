import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import CreateTweet from './tweet/CreateTweet';
import GetTweet from './GetTweet';
import SingleTweet from './SingleTweet';

import { GoBack } from '../../../img/Svgs';

const SingleTweetView = ({ auth: { user, loading }, history }) => {
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
          <h2 className='heading-2'>Tweet</h2>
        </div>
      </div>
      <SingleTweet user={user} />
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
