import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateTweet from './CreateTweet';
import Tweet from './Tweet';
//import { deleteTweet } from '../../../actions/tweets';

import { Star } from '../../../img/Svgs';

const MainContent = ({ user: { user } }) => {
  return (
    <main className='mainContent'>
      <div className='mainContent__header'>
        <div className='mainContent__header__content'>
          <h2 className='heading-2'>Home</h2>
          <Star className='mainContent__header__content__icon' />
        </div>
      </div>
      <CreateTweet />
      <div className='breakline'>&nbsp;</div>
      {user &&
        user.tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)}
    </main>
  );
};

MainContent.propTypes = {
  createTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { createTweet })(MainContent);

// {testTweets.tweets.map((tweet) => (
//   <Tweet tweet={tweet} key={tweet.id} />
// ))}
