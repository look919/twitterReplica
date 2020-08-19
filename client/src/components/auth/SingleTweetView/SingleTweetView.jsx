import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import CreateTweet from './tweet/CreateTweet';
// import GetTweets from './tweet/GetTweets';

import { GoBack } from '../../../img/Svgs';

const singleTweetView = ({ user: { user }, history }) => {
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
    </main>
  );
};

singleTweetView.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(singleTweetView));

// <CreateTweet placeholder='Whats happening?' />
//       <div className='breakline'>&nbsp;</div>
//       <GetTweets user={user} />
