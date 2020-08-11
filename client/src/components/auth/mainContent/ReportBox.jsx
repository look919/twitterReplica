import React from 'react';

import { SadFace, Unfollow, Mute, Block } from '../../../img/Svgs';

//This component is also responsible for deleting tweets if its ours.
const ReportBox = ({ eventListener }) => {
  return (
    <div className='tweet__content__author__box'>
      <button
        onClick={(e) => eventListener(e)}
        value='spam'
        className='tweet__content__author__box__btn'
      >
        <SadFace className='tweet__content__author__box__btn__icon' /> Not
        intrested in this Tweet
      </button>
      <button
        onClick={(e) => eventListener(e)}
        className='tweet__content__author__box__btn'
        value='insulting'
      >
        <Unfollow className='tweet__content__author__box__btn__icon' /> Unfollow
        DefaultUser
      </button>
      <button
        onClick={(e) => eventListener(e)}
        value='plagiarism'
        className='tweet__content__author__box__btn'
      >
        <Mute className='tweet__content__author__box__btn__icon' /> Mute
        DefaultUser
      </button>
      <button
        onClick={(e) => eventListener(e)}
        value='lowQuality'
        className='tweet__content__author__box__btn'
      >
        <Block className='tweet__content__author__box__btn__icon' /> Block
        DefaultUser
      </button>
    </div>
  );
};

export default ReportBox;
