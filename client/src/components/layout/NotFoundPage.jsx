import React from 'react';
import { Link } from 'react-router-dom';

import { TwitterLogo } from '../../img/Svgs';

const NotFoundPage = () => {
  return (
    <div className='inDevPage'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
      </Link>
      <h1 className='heading-1'>404 nie znaleziono</h1>
      <p className='inDevPage__p'>
        Strona której szukasz prawdopodobnie nie istnieje lub jest obecnie
        niedostępna.
      </p>
      <Link to='/' className='btn-inline'>
        Strona główna &rarr;
      </Link>
    </div>
  );
};

export default NotFoundPage;
