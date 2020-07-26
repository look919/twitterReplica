import React from 'react';

import { Search } from '../../img/Svgs';
const Recommended = () => {
  return (
    <nav className='ąuth__recommended'>
      <form className='input-search-container'>
        <input className='input-search' placeholder='Wyszukiwarka Twittera' />
        <Search className='input-search-container__icon' />
      </form>
    </nav>
  );
};

export default Recommended;
