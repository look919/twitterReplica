import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import findLinksInText from '../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';
import LoadingGif from '../../../img/loading.gif';
import { follow, unFollow } from '../../../actions/user';

import {
  City,
  ProfileLink,
  JoinedAt,
  ProfileOptions,
  ProfileMessage,
  ProfileBell,
} from '../../../img/Svgs';

const SingleProfile = ({
  auth: { user, loading },
  profile,
  follow,
  unFollow,
  editProfile,
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const onFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setActionLoading(true);
    await follow(profile);
    setActionLoading(false);
  };
  const onUnFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setActionLoading(true);
    await unFollow(profile);
    setActionLoading(false);
  };

  if (loading || !user) return null;

  return (
    <div className='profile'>
      {profile.backgroundImage ? (
        <img
          src={profile.backgroundImage}
          className='profile__backgroundImg'
          alt='profile background'
        />
      ) : (
        <div className='profile__backgroundImg__default'>&nbsp;</div>
      )}
      <div className='profile__box'>
        <img src={profile.photo} className='profile__box__photo' alt='user' />
        <div className='profile__box__followBox'>
          {user._id !== profile._id && (
            <Fragment>
              <ProfileOptions className='profile__box__followBox__icon' />
              <ProfileMessage className='profile__box__followBox__icon' />
              <ProfileBell className='profile__box__followBox__icon' />
            </Fragment>
          )}

          {actionLoading ? (
            <img
              src={LoadingGif}
              className='editProfile__heading__btn__loading'
              alt='loading...'
            />
          ) : !actionLoading && editProfile ? (
            <div>&nbsp;</div>
          ) : user._id === profile._id ? (
            <Link to={`/edit/${profile.at}`} className='btn btn--dark'>
              Set up profile
            </Link>
          ) : user.following.includes(profile._id) ? (
            <button onClick={onUnFollow} className='btn'>
              Following
            </button>
          ) : (
            <button onClick={onFollow} className='btn btn--dark'>
              Follow
            </button>
          )}
        </div>
        <div className='profile__box__user'>
          <span className='profile__box__user__name'>{profile.name}</span>
          <span className='profile__box__user__at'>{profile.at}</span>
        </div>
        <span className='profile__box__desc'>
          {findLinksInText(emoji(profile.description))}
        </span>
        <div className='profile__box__info'>
          {profile.city && (
            <div className='profile__box__info__item'>
              <City className='profile__box__info__item__icon' />
              <span className='profile__box__info__item__text'>
                {profile.city}
              </span>
            </div>
          )}
          {profile.link && (
            <div className='profile__box__info__item'>
              <ProfileLink className='profile__box__info__item__icon' />
              <a
                href={profile.link}
                className='profile__box__info__item__text profile__box__info__item__text--link'
              >
                {profile.link}
              </a>
            </div>
          )}
          <div className='profile__box__info__item'>
            <JoinedAt className='profile__box__info__item__icon' />
            <span className='profile__box__info__item__text'>
              {'Joined: ' + moment(profile.createdAt).format('MMMM YYYY')}
            </span>
          </div>
        </div>
        <div className='profile__box__clicksNum'>
          <div className='profile__box__clicksNum__item'>
            <span className='profile__box__clicksNum__item__num'>
              {profile.following.length}
            </span>{' '}
            Following
          </div>
          <div className='profile__box__clicksNum__item'>
            <span className='profile__box__clicksNum__item__num'>
              {profile.followers.length}
            </span>{' '}
            Followers
          </div>
        </div>
      </div>
      {!editProfile ? (
        <div className='profile__btns'>
          <div className='profile__btns__item profile__btns__item--active'>
            Tweets
          </div>
          <div className='profile__btns__item'>Tweets & replies</div>
          <div className='profile__btns__item'>Media</div>
          <div className='profile__btns__item'>Likes</div>
        </div>
      ) : (
        <div className='breakline'>&nbsp;</div>
      )}
    </div>
  );
};

SingleProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { follow, unFollow })(SingleProfile);
