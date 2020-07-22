import React from 'react';
import { Link } from 'react-router-dom';

import { TwitterLogo, Settings, Search } from '../../img/Svgs.jsx';

const ExploreHeader = () => {
  return (
    <header className='nonAuth__header'>
      <Link to='/' className='logo-link'>
        <TwitterLogo className='logo' />
      </Link>
      <form className='input-search-container'>
        <input className='input-search' placeholder='Wyszukiwarka Twittera' />
        <Search className='input-search-container__icon' />
      </form>
      <button className='btn btn--dark'>Zaloguj się</button>
      <button className='btn'>Zarejestruj się</button>
      <Settings className='nonAuth__settings' />
    </header>
  );
};

export default ExploreHeader;
