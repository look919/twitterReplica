import React, { useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { SettingsTwo } from '../../../img/Svgs';

const RecommendedTrends = () => {
  const [showMore, setShowMore] = useState(false);
  const buttonText = useRef(0);

  const onShowMoreChange = () => {
    if (!showMore) {
      setShowMore(true);
      buttonText.current.textContent = 'Show less';
    } else {
      setShowMore(false);
      buttonText.current.textContent = 'Show more';
    }
  };

  const dummyData = ['#polish', '#K2K', '#Grace', '#Lorem', '#ipsum'];
  const additionalItem = '#There is more dummy data';

  return (
    <div className='auth__recommended__content__trends'>
      <div className='auth__recommended__content__trends__heading'>
        <h2 className='heading-2'>Trends for you</h2>
        <SettingsTwo className='auth__recommended__content__trends__heading__icon' />
      </div>
      <div className='auth__recommended__content__trends__list'>
        {dummyData.map((item) => (
          <Link
            key={item}
            to={`/search${item.replace(/\s/g, '')}`}
            className='auth__recommended__content__trends__list__item'
          >
            {item}
          </Link>
        ))}

        {showMore && (
          <Fragment>
            <Link
              to={`/search/${additionalItem.replace(/\s/g, '')}`}
              className='auth__recommended__content__trends__list__item'
            >
              {additionalItem}
            </Link>
          </Fragment>
        )}

        <button
          onClick={onShowMoreChange}
          ref={buttonText}
          className='btn-inline auth__recommended__content__trends__more'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default RecommendedTrends;
