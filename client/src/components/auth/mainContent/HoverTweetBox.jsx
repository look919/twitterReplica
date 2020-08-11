import React from 'react';
import { Link } from 'react-router-dom';

const HoverTweetBox = ({ user, idClass }) => {
  if (typeof user !== 'object') return null;

  return (
    <div className={`tweetHoverBox ${idClass}`}>
      <Link to='/dev' className='tweetHoverBox__header'>
        <img
          src={user.photo}
          className='tweetHoverBox__header__img'
          alt='user'
        />
        <button className='btn tweetHoverBox__header__btn'>Following</button>
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

export default HoverTweetBox;
