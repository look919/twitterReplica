import React from 'react';
import { Link } from 'react-router-dom';

import { SettingsTwo } from '../../../img/Svgs';

const RecommendedTrends = () => {
  return (
    <div className='auth__recommended__content__trends'>
      <div className='auth__recommended__content__trends__heading'>
        <h2 className='heading-2'>Trends for you</h2>
        <Link to='/dev'>
          <SettingsTwo className='auth__recommended__content__trends__heading__icon' />
        </Link>
      </div>
      <div className='auth__recommended__content__trends__list'>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          #sejm
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          Polish
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          Kanye
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          Lorem
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          #ipsum
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          #covidi9
        </Link>
        <Link
          to='/dev'
          className='auth__recommended__content__trends__list__item'
        >
          <span className='btn-inline'>Show more</span>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedTrends;
