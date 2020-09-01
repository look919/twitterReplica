import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GetProfile from './GetProfile';

import { GoBack } from '../../../img/Svgs';

const ProfileView = ({ auth: { user }, history, paramUser, editProfile }) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <main className='profile'>
      <div className='profile__header'>
        <div className='profile__header__content'>
          <button className='profile__header__btn' onClick={history.goBack}>
            <GoBack className='profile__header__icon' />
          </button>
          <button
            onClick={scrollToTop}
            className='heading-2 profile__header__heading'
          >
            Profile
          </button>
        </div>
      </div>
      <GetProfile user={user} paramUser={paramUser} editProfile={editProfile} />
    </main>
  );
};

ProfileView.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(ProfileView));
