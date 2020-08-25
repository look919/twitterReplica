import React from 'react';
import { Link } from 'react-router-dom';

import { Following } from '../../../img/Svgs';

const SearchResult = ({ user, profile }) => {
  const followed = user.following.includes(profile._id);

  return (
    <Link
      to={`/${profile.at}`}
      className={
        followed
          ? 'auth__recommended__content__search-results__item auth__recommended__content__search-results__item--followed'
          : 'auth__recommended__content__search-results__item'
      }
    >
      <div className='auth__recommended__content__search-results__item__img'>
        {followed && (
          <Following className='auth__recommended__content__search-results__item__img__icon' />
        )}
        <img
          src={profile.photo}
          className='auth__recommended__content__search-results__item__img__photo'
          alt='profile'
        />
      </div>

      <div className='auth__recommended__content__search-results__item__user__text'>
        {followed && (
          <span className='auth__recommended__content__search-results__item__user__text__p'>
            Following
          </span>
        )}
        <h3 className='heading-3 auth__recommended__content__search-results__item__user__text__name'>
          {profile.name}
        </h3>
        <p className='auth__recommended__content__search-results__item__user__text__p'>
          {profile.at}
        </p>
      </div>
    </Link>
  );
};

export default SearchResult;
