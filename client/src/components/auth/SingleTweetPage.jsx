import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useMediaQuery } from 'react-responsive';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import SingleTweetView from './SingleTweetView/SingleTweetView';
import Recommended from './sidebars/Recommended';

const SingleTweetPage = ({ user, logout, ...props }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <section className='auth'>
      {!isMobile ? (
        <NavBar user={user} logout={logout} />
      ) : (
        <MobileBottomNav user={user} tweetCreateModalIcon={false} />
      )}
      <SingleTweetView user={user} paramTweet={props.match.params.tweetId} />
      {!isMobile && <Recommended />}
    </section>
  );
};

SingleTweetPage.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(SingleTweetPage);
