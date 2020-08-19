import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import SingleTweetView from './SingleTweetView/SingleTweetView';
import Recommended from './sidebars/Recommended';

const SingleTweet = ({ user, logout, ...props }) => {
  return (
    <section className='auth'>
      <NavBar user={user} logout={logout} />
      <SingleTweetView user={user} paramTweet={props.match.params.tweetId} />
      <Recommended />
    </section>
  );
};

SingleTweet.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(SingleTweet);
