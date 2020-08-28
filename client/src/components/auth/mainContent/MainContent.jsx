import React, { Fragment } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateTweet from './tweet/CreateTweet';
import GetTweets from './tweet/GetTweets';
import { useMediaQuery } from 'react-responsive';

import { Star } from '../../../img/Svgs';

const MainContent = ({ auth: { user }, logout }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
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
          {!isMobile ? (
            <Star className='mainContent__header__content__icon' />
          ) : (
            <button onClick={handleLogout} className='btn btn-inline'>
              Log out
            </button>
          )}
        </div>
      </div>
      {!isMobile && (
        <Fragment>
          <CreateTweet
            placeholder='Whats happening?'
            fileUploadId='mainContent'
          />
          <div className='breakline'>&nbsp;</div>
        </Fragment>
      )}

      <GetTweets user={user} />
    </main>
  );
};

MainContent.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MainContent);
