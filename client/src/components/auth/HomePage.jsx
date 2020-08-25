import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import MainContent from './mainContent/MainContent';
import Recommended from './sidebars/Recommended';

const HomePage = ({ user, logout }) => (
  <section className='auth'>
    <NavBar user={user} logout={logout} />
    <MainContent />
    <Recommended />
  </section>
);

HomePage.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(HomePage);
