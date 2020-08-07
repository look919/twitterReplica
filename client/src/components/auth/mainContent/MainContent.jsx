import React from 'react';

import CreateTweet from './CreateTweet';
import { Star } from '../../../img/Svgs';
import Tweet from './Tweet';
import testTweets from '../../../utils/testTweets.json';

import { connect } from 'react-redux';
import { createTweet } from '../../../actions/tweets';
import PropTypes from 'prop-types';

const MainContent = ({ user: { user } }) => {
  console.log(user);
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
