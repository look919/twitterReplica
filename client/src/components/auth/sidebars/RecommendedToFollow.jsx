import React from 'react';
import { Link } from 'react-router-dom';

import selectUsers from '../../../selectors/getWhoToFollowUsers';
import RecommendedToFollowProfile from './RecommendedToFollowProfile';

const RecommendedToFollow = ({ loggedAccount, users }) => {
  return (
    <div className='auth__recommended__content__follow'>
      <div className='auth__recommended__content__follow__heading'>
        <h2 className='heading-2'>Who to follow</h2>
      </div>
      <div className='auth__recommended__content__follow__users'>
        {selectUsers(loggedAccount, users).map((recommendedProfile) => (
          <RecommendedToFollowProfile
            user={loggedAccount}
            profile={recommendedProfile}
            key={recommendedProfile._id}
          />
        ))}
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
