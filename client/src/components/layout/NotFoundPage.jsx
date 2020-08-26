import React from 'react';
import { Link } from 'react-router-dom';

import { TwitterLogo } from '../../img/Svgs';

const NotFoundPage = () => {
  return (
    <div className='inDevPage'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
      </Link>
      <h1 className='heading-1'>404 not found</h1>
      <p className='inDevPage__p'>
        The site you are looking for probably does not exist or is currently
        unavailable.
      </p>
      <Link to='/' className='btn-inline'>
        Main page &rarr;
      </Link>
    </div>
  );
};

export default NotFoundPage;
