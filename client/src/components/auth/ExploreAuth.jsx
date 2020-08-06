import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import NavBar from './NavBar';
import MainContent from './mainContent/MainContent';
import Recommended from './Recommended';

const ExploreAuth = ({ user, logout }) => {
  return (
    <section className='auth'>
      <NavBar user={user} logout={logout} />
      <MainContent />
      <Recommended />
    </section>
  );
};

ExploreAuth.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(ExploreAuth);
