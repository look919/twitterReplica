import React from 'react';
import { Link } from 'react-router-dom';

import { TwitterLogo } from '../../img/Svgs';

const NavBar = () => {
  return (
    <nav className='auth__nav'>
      <Link to='/' className='logo-link'>
        <TwitterLogo className='logo' />
      </Link>
    </nav>
  );
};

export default NavBar;
