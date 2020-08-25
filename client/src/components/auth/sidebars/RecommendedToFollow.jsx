import React, { useState, useRef } from 'react';

import selectUsers from '../../../selectors/getWhoToFollowUsers';
import RecommendedToFollowProfile from './RecommendedToFollowProfile';

const RecommendedToFollow = ({ loggedAccount, users }) => {
  const [amountToRender, setAmountToRender] = useState(3);
  const buttonText = useRef(0);

  const onAmountChange = () => {
    if (amountToRender === 3) {
      setAmountToRender(5);
      buttonText.current.textContent = 'Show less';
    } else {
      setAmountToRender(3);
      buttonText.current.textContent = 'Show more';
    }
  };

  return (
    <div className='auth__recommended__content__follow'>
      <div className='auth__recommended__content__follow__heading'>
        <h2 className='heading-2'>Who to follow</h2>
      </div>
      <div className='auth__recommended__content__follow__users'>
        {selectUsers(loggedAccount, users, amountToRender).map(
          (recommendedProfile) => (
            <RecommendedToFollowProfile
              user={loggedAccount}
              profile={recommendedProfile}
              key={recommendedProfile._id}
            />
          )
        )}
        <button
          onClick={onAmountChange}
          ref={buttonText}
          className='btn-inline auth__recommended__content__follow__more'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default RecommendedToFollow;
