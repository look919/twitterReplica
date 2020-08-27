import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { follow, unFollow } from '../../../actions/user';
import LoadingGif from '../../../img/loading.gif';

const RecommendedToFollowProfile = ({ user, profile, follow, unFollow }) => {
  const [actionLoading, setActionLoading] = useState(false);

  const onFollow = async (e) => {
    e.preventDefault();

    setActionLoading(true);
    await follow(profile);
    setActionLoading(false);
  };

  return (
    <Link
      to={`/${profile.at}`}
      className='auth__recommended__content__follow__users__user'
    >
      <img
        src={profile.photo}
        className='auth__recommended__content__follow__users__user__photo'
        alt='profile'
      />
      <div className='auth__recommended__content__follow__users__user__text'>
        <h3 className='heading-3 auth__recommended__content__follow__users__user__text__name'>
          {profile.name}
        </h3>
        <p className='auth__recommended__content__follow__users__user__text__p'>
          {profile.at}
        </p>
      </div>
      {actionLoading ? (
        <img
          src={LoadingGif}
          className='editProfile__heading__btn__loading'
          alt='loading...'
        />
      ) : (
        <button onClick={onFollow} className='btn btn--dark'>
          Follow
        </button>
      )}
    </Link>
  );
};
RecommendedToFollowProfile.propTypes = {
  user: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
};

export default connect(null, { follow, unFollow })(RecommendedToFollowProfile);
