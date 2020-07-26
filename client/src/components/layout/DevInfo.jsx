import React from 'react';
import { Link } from 'react-router-dom';

import { TwitterLogo } from '../../img/Svgs';

const DevInfo = () => {
  return (
    <div className='inDevPage'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
      </Link>
      <h1 className='heading-1'>Page is not ready</h1>
      <p className='inDevPage__p'>
        My goal in this project is to implement the most important Twitter's
        funcionalites, that's why I redirect less important stuff to this page.
      </p>
      <Link to='/' className='btn-inline'>
        Go back &rarr;
      </Link>
    </div>
  );
};

export default DevInfo;
