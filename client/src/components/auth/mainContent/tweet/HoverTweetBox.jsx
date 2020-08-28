import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { follow, unFollow } from '../../../../actions/user';
import LoadingGif from '../../../../img/loading.gif';
import PropTypes from 'prop-types';

const HoverTweetBox = ({ auth, user, follow, unFollow, idClass, styles }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    await follow(user);
    user.followers.push(auth.user._id);
  };
  const onUnFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    await unFollow(user);
    user.followers.filter((id) => id !== auth.user._id);
  };

  if (typeof user !== 'object' || (!auth.user && !auth.loading)) return null;

  return (
    <div style={styles} className={`tweetHoverBox ${idClass}`}>
      <div className='tweetHoverBox__header'>
        <Link to={`/${user.at}`}>
          <img
            src={user.photo}
            className='tweetHoverBox__header__img'
            alt='user'
          />
        </Link>
        {auth.user._id === user._id ? (
          <div>&nbsp;</div>
        ) : loading ? (
          <img src={LoadingGif} className='loading' alt='loading...' />
        ) : !loading && auth.user.following.includes(user._id) ? (
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
      </div>
      <div className='tweetHoverBox__userName'>
        <Link to={`/${user.at}`} className='tweetHoverBox__userName__name'>
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
