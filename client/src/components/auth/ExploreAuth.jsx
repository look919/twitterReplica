import React from 'react';

import NavBar from './NavBar';
import MainContent from './mainContent/MainContent';
import Recommended from './Recommended';

const ExploreAuth = () => {
  return (
    <section className='auth'>
      <NavBar />
      <MainContent />
      <Recommended />
    </section>
  );
};

export default ExploreAuth;
