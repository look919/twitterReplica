import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedToFollowProfile = ({ name, at, img }) => {
  return (
    <Link to='/dev' className='auth__recommended__content__follow__users__user'>
      <img
        src={img}
        className='auth__recommended__content__follow__users__user__photo'
        alt='profile'
      />
      <div className='auth__recommended__content__follow__users__user__text'>
        <h3 className='heading-3 auth__recommended__content__follow__users__user__text__name'>
          {name}
        </h3>
        <p className='auth__recommended__content__follow__users__user__text__p'>
          {at}
        </p>
      </div>
      <button className='btn btn--dark'>Follow</button>
    </Link>
  );
};

export default RecommendedToFollowProfile;
