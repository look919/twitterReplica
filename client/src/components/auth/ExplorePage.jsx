import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, setInitialStates } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import Explore from '../nonAuth/Explore';
import Recommended from './sidebars/Recommended';

import { useMediaQuery } from 'react-responsive';
import { GoBack } from '../../img/Svgs';

const ExplorePage = ({ user, logout, setInitialStates, history }) => {
  useEffect(() => {
    setInitialStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <main className='explorePage'>
        <div className='explorePage__header'>
          <div className='explorePage__header__content'>
            <button
              className='explorePage__header__btn'
              onClick={history.goBack}
            >
              <GoBack className='explorePage__header__icon' />
            </button>
            <button
              onClick={scrollToTop}
              className='heading-2 explorePage__header__heading'
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
  setInitialStates: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default withRouter(
  connect(mapStateToProps, { logout, setInitialStates })(ExplorePage)
);
