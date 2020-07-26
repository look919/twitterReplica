import React from 'react';
import ExploreAuth from './auth/ExploreAuth';
import ExploreNonAuth from './nonAuth/ExploreNonAuth';

const MainPage = () => {
  return (
    <div className='container'>
      {true ? <ExploreAuth /> : <ExploreNonAuth />}
    </div>
  );
};

export default MainPage;
