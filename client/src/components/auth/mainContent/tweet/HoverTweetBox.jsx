import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { follow, unFollow } from '../../../../actions/user';

import PropTypes from 'prop-types';

const HoverTweetBox = ({ auth, user, follow, unFollow, idClass, styles }) => {
  if (typeof user !== 'object' || (!auth.user && !auth.loading)) return null;

  const onFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await follow(user);
    user.followers.push(auth.user._id);
  };
  const onUnFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await unFollow(user);
    user.followers.filter((id) => id !== auth.user._id);
  };

  return (
    <div style={styles} className={`tweetHoverBox ${idClass}`}>
      <Link to='/dev' className='tweetHoverBox__header'>
        <img
          src={user.photo}
          className='tweetHoverBox__header__img'
          alt='user'
        />
        {auth.user._id === user._id ? (
          <div>&nbsp;</div>
        ) : auth.user.following.includes(user._id) ? (
          <button
            onClick={onUnFollow}
            className='btn tweetHoverBox__header__btn btn--dark'
          >
            Following
          </button>
        ) : (
          <button onClick={onFollow} className='btn tweetHoverBox__header__btn'>
            Follow
          </button>
        )}
      </Link>
      <div className='tweetHoverBox__userName'>
        <Link to='/dev' className='tweetHoverBox__userName__name'>
          {user.name}
        </Link>
        <span className='tweetHoverBox__userName__at'>{user.at}</span>
      </div>
      <div className='tweetHoverBox__desc'>{user.description}</div>
      <div className='tweetHoverBox__numbers'>
        <span className='tweetHoverBox__numbers__following-num'>
          {user.following.length}
        </span>
        <span className='tweetHoverBox__numbers__following-text'>
          Following
        </span>
        <span className='tweetHoverBox__numbers__followers-num'>
          {user.followers.length}
        </span>
        <span className='tweetHoverBox__numbers__followers-text'>
          Followers
        </span>
      </div>
    </div>
  );
};

HoverTweetBox.propTypes = {
  auth: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  follow,
  unFollow,
})(HoverTweetBox);
