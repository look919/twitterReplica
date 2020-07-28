import React from 'react';

import CreateTweet from './CreateTweet';
import { Star } from '../../../img/Svgs';
import Tweet from './Tweet';

const MainContent = () => {
  return (
    <main className='mainContent'>
      <div className='mainContent__header'>
        <div className='mainContent__header__content'>
          <h2 className='heading-2'>Home</h2>
          <Star className='mainContent__header__content__icon' />
        </div>
        <CreateTweet />
        <div className='breakline'>&nbsp;</div>
        <Tweet />
      </div>
    </main>
  );
};

export default MainContent;
