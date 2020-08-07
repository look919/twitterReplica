import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import RegisterModal from './RegisterModal';
import { TwitterLogo, Settings, Search } from '../../img/Svgs.jsx';

const ExploreHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  //modalfunc
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  return (
    <header className='nonAuth__header'>
      <Link to='/' className='logo-link'>
        <TwitterLogo className='logo' />
      </Link>
      <form className='input-search-container'>
        <input className='input-search' placeholder='Wyszukiwarka Twittera' />
        <Search className='input-search-container__icon' />
      </form>
      <Link to='/login' className='btn btn--dark'>
        Log in
      </Link>
      <button onClick={openModal} className='btn'>
        Sign up
      </button>
      <Settings className='nonAuth__settings' />
      <RegisterModal modalIsOpen={modalIsOpen} />
    </header>
  );
};

export default ExploreHeader;
