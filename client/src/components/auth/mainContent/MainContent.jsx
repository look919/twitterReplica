import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateTweet from './tweet/CreateTweet';
import GetTweets from './tweet/GetTweets';

import { Star } from '../../../img/Svgs';

const MainContent = ({ user: { user } }) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <main className='mainContent'>
      <div className='mainContent__header'>
        <div className='mainContent__header__content'>
          <button
            onClick={scrollToTop}
            className='heading-2 mainContent__header__content__heading'
          >
            Home
          </button>
          <Star className='mainContent__header__content__icon' />
        </div>
      </div>
      <CreateTweet placeholder='Whats happening?' fileUploadId='mainContent' />
      <div className='breakline'>&nbsp;</div>
      <GetTweets user={user} />
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
