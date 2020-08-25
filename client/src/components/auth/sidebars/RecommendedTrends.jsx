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
        {showMore && (
          <Fragment>
            <Link
              to='/dev'
              className='auth__recommended__content__trends__list__item'
            >
              There is more #dummy data
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
