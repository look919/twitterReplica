import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import MainContent from './mainContent/MainContent';
import Recommended from './sidebars/Recommended';

import { useMediaQuery } from 'react-responsive';

const HomePage = ({ user, logout }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <section className='auth'>
      {!isMobile ? (
        <NavBar user={user} logout={logout} />
      ) : (
        <MobileBottomNav user={user} tweetCreateModalIcon={true} />
      )}
      <MainContent logout={logout} />
      {!isMobile && <Recommended />}
    </section>
  );
};

HomePage.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(HomePage);
