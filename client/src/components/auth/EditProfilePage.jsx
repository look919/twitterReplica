import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import ProfileView from './profileView/ProfileView';
import Recommended from './sidebars/Recommended';

const ProfilePage = ({ user, logout, ...props }) => {
  return (
    <section className='auth'>
      <NavBar user={user} logout={logout} />
      <ProfileView
        user={user}
        paramUser={props.match.params.userAt}
        editProfile={true}
      />
      <Recommended />
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
