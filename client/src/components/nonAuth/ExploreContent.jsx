import React from 'react';

import Explore from './Explore';
import ExploreSideBar from './ExploreSideBar';

const ExploreContent = () => {
  return (
    <section className='nonAuth__content'>
      <div className='nonAuth__content__explore'>
        <div className='nonAuth__content__explore__heading'>
          <h2 className='heading-2'>Explore</h2>
        </div>
        <Explore />
      </div>

      <ExploreSideBar />
    </section>
  );
};
export default ExploreContent;
