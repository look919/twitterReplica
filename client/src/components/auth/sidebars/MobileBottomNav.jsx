import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import CreateTweet from '../mainContent/tweet/CreateTweet';
import defaultUser from '../../../utils/defaultUser.js';

import {
  Home,
  Explore,
  Profile,
  CreateTweetIcon,
  Exit,
  Search,
} from '../../../img/Svgs';

const MobileBottomNav = ({ user, tweetCreateModalIcon }) => {
  if (!user) user = defaultUser;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className='auth__nav'>
      <div className='auth__nav__content'>
        <nav className='auth__nav__content__nav auth__nav__content__nav--mobile'>
          <NavLink
            to='/home'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
            exact={true}
          >
            <Home className='auth__nav__content__nav__item__icon' />{' '}
          </NavLink>
          <NavLink
            to='/explore'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Explore className='auth__nav__content__nav__item__icon' />{' '}
          </NavLink>
          <NavLink
            to='/search'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Search className='auth__nav__content__nav__item__icon' />{' '}
          </NavLink>
          <NavLink
            to={`/${user.at}`}
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Profile className='auth__nav__content__nav__item__icon' />{' '}
          </NavLink>
        </nav>
        {tweetCreateModalIcon && (
          <Fragment>
            <button
              onClick={openModal}
              className='btn btn--wide auth__nav__content__nav__item__btn'
            >
              <CreateTweetIcon className='auth__nav__content__nav__item__btn__icon' />
            </button>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              className='auth__nav__content__createTweet'
              ariaHideApp={false}
            >
              <div className='auth__nav__content__createTweet__header'>
                <button
                  onClick={closeModal}
                  className='auth__nav__content__createTweet__header__btn'
                >
                  <Exit className='auth__nav__content__createTweet__header__btn__icon' />
                </button>
              </div>
              <div className='auth__nav__content__createTweet__header__creator'>
                <CreateTweet
                  placeholder="What's happening?"
                  modal={true}
                  fileUploadId='modal'
                  closeModal={closeModal}
                />
              </div>
            </Modal>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default MobileBottomNav;
