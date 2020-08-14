import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateTweet from './tweet/CreateTweet';
import Tweet from './tweet/Tweet';
import GetAllTweets from './tweet/GetTweets';

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
      <CreateTweet placeholder='Whats happening?' />
      <div className='breakline'>&nbsp;</div>
      <GetAllTweets user={user} />
    </main>
  );
};

MainContent.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, {})(MainContent);
