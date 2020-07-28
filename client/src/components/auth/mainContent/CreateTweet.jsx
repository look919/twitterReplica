import React from 'react';

import defaultUser from '../../../img/default_profile.png';
import {
  AddImage,
  AddGif,
  AddPool,
  AddEmoji,
  AddSchedule,
} from '../../../img/Svgs';

const CreateTweet = () => {
  return (
    <div className='mainContent__createTweet'>
      <div className='mainContent__createTweet__img'>
        <img
          src={defaultUser}
          className='mainContent__createTweet__img__photo'
          alt='user'
        />
      </div>
      <div className='mainContent__createTweet__tweet'>
        <div className='mainContent__createTweet__tweet__text'>
          What's happening
        </div>
      </div>
      <div className='mainContent__createTweet__options'>
        <AddImage className='mainContent__createTweet__options__icon' />
        <AddGif className='mainContent__createTweet__options__icon' />
        <AddPool className='mainContent__createTweet__options__icon' />
        <AddEmoji className='mainContent__createTweet__options__icon' />
        <AddSchedule className='mainContent__createTweet__options__icon' />
        <button className='btn mainContent__createTweet__options__btn'>
          Tweet
        </button>
      </div>
    </div>
  );
};
export default CreateTweet;
