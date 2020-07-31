import React from 'react';

import CreateTweet from './CreateTweet';
import { Star } from '../../../img/Svgs';
import Tweet from './Tweet';
import testTweets from '../../../utils/testTweets.json';

const MainContent = () => {
  return (
    <main className='mainContent'>
      <div className='mainContent__header'>
        <div className='mainContent__header__content'>
          <h2 className='heading-2'>Home</h2>
          <Star className='mainContent__header__content__icon' />
        </div>
      </div>
      <CreateTweet />
      <div className='breakline'>&nbsp;</div>
      {testTweets.tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet.id} />
      ))}
    </main>
  );
};

export default MainContent;
