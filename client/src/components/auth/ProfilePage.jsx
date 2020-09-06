import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useMediaQuery } from 'react-responsive';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import ProfileView from './profileView/ProfileView';
import Recommended from './sidebars/Recommended';

const ProfilePage = ({ user, logout, ...props }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const isMobileLandscape = useMediaQuery({ query: '(max-height: 500px)' });

  return (
    <section className='auth'>
      {!isMobile && !isMobileLandscape ? (
        <NavBar user={user} logout={logout} />
      ) : (
        <MobileBottomNav user={user} tweetCreateModalIcon={false} />
      )}
      <ProfileView
        user={user}
        paramUser={props.match.params.userAt}
        editProfile={false}
      />
      {!isMobile && <Recommended />}
    </section>
  );
};

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(ProfilePage);
