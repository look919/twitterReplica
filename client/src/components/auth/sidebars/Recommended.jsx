import React from 'react';
import { Link } from 'react-router-dom';

import { Search, ArrowDown } from '../../../img/Svgs';
import RecommendedTrends from './RecommendedTrends';
import RecommendedToFollow from './RecommendedToFollow';

const Recommended = () => {
  return (
    <nav className='auth__recommended'>
      <div className='auth__recommended__content'>
        <form className='input-search-container'>
          <input
            className='input-search input-search--big'
            placeholder='Search Twitter'
          />
          <Search className='input-search-container__icon input-search-container__icon--big' />
        </form>
        <RecommendedTrends />
        <RecommendedToFollow />
        <div className='auth__recommended__content__footer'>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Terms
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Privacy policy
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Cookies
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Ads info
          </Link>

          <Link to='/dev' className='auth__recommended__content__footer__item'>
            More{' '}
            <ArrowDown className='auth__recommended__content__footer__item__icon' />
          </Link>
        </div>
        <Link
          to='/dev'
          className='auth__recommended__content__footer__item auth__recommended__content__footer__item--copyright'
        >
          &copy; 2020 Twitter replica by Wirkus Tomasz
        </Link>
      </div>
    </nav>
  );
};

export default Recommended;
