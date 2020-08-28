import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import Explore from '../nonAuth/Explore';
import Recommended from './sidebars/Recommended';

import { useMediaQuery } from 'react-responsive';
import { GoBack } from '../../img/Svgs';

const ExplorePage = ({ user, logout, history }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <section className='auth'>
      {!isMobile ? (
        <NavBar user={user} logout={logout} />
      ) : (
        <MobileBottomNav user={user} />
      )}
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
              Explore
            </button>
          </div>
        </div>
        <Explore auth={true} />
      </main>
      {!isMobile && <Recommended />}
    </section>
  );
};

ExplorePage.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, { logout })(ExplorePage));
