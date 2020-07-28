import React from 'react';

import defaultUser from '../../../img/default_profile.png';
import { Comments, Retweets, Likes, OtherOptions } from '../../../img/Svgs';

const Tweet = ({
  img = false,
  video = false,
  answer = false,
  retweet = false,
  like = false,
  user,
  text,
}) => {
  return (
    <div className='mainContent__tweet'>
      <div className='mainContent__tweet__img'>
        <img
          src={defaultUser}
          className='mainContent__tweet__img__photo'
          alt='user'
        />
      </div>
      <div className='mainContent__tweet__tweet'>
        <div className='mainContent__tweet__tweet__text'>What's happening</div>
      </div>
      <div className='mainContent__tweet__options'>
        <div className='mainContent__tweet__options__option'>
          <Comments className='mainContent__tweet__options__option__icon' />
          <span className='mainContent__tweet__options__option__amount'>7</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
