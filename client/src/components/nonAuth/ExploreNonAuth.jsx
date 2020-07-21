import React from 'react';
import ExploreHeader from './ExploreHeader';
import ExploreContent from './ExploreContent';

const ExploreNonAuth = () => {
  return (
    <div className='nonAuth'>
      <ExploreHeader />
      <div className='nonAuth__line'>&nbsp;</div>
      <ExploreContent />
    </div>
  );
};

export default ExploreNonAuth;
