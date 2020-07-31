import React from 'react';
import { Link } from 'react-router-dom';
import defaultUser from '../../img/default_profile.png';
import RecommendedToFollowProfile from './RecommendedToFollowProfile';

const RecommendedToFollow = () => {
  return (
    <div className='auth__recommended__content__follow'>
      <div className='auth__recommended__content__follow__heading'>
        <h2 className='heading-2'>Who to follow</h2>
      </div>
      <div className='auth__recommended__content__follow__users'>
        <RecommendedToFollowProfile
          name='Default Profile1'
          at='DefaultProfile1'
          img={defaultUser}
        />
        <RecommendedToFollowProfile
          name='Default Profile2'
          at='DefaultProfile2'
          img={defaultUser}
        />
        <RecommendedToFollowProfile
          name='Default Profile3'
          at='DefaultProfile3'
          img={defaultUser}
        />
        <Link
          to='/dev'
          className='auth__recommended__content__follow__users__item'
        >
          <span className='btn-inline auth__recommended__content__follow__more'>
            Show more
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedToFollow;
