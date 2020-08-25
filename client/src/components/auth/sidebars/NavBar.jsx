import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import CreateTweet from '../mainContent/tweet/CreateTweet';
import defaultUser from '../../../utils/defaultUser.js';

import {
  TwitterLogo,
  Home,
  Explore,
  Notifications,
  Messages,
  Bookmarks,
  Lists,
  Profile,
  More,
  ArrowDown,
  Approved,
  Exit,
} from '../../../img/Svgs';

const NavBar = ({ user, logout }) => {
  if (!user) user = defaultUser;

  const [userBox, setUserBox] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };
  const handleSetUserBox = () => {
    userBox ? setUserBox(false) : setUserBox(true);
  };
  const handleLogout = (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <section className='auth__nav'>
      <div className='auth__nav__content'>
        <div className='auth__nav__content__logo'>
          <Link to='/' className='logo-link'>
            <TwitterLogo className='logo' />
          </Link>
        </div>
        <nav className='auth__nav__content__nav'>
          <NavLink
            to='/home'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
            exact={true}
          >
            <Home className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Home
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Explore className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Explore
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Notifications className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Notifications
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Messages className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Messages
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Bookmarks className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Bookmarks
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Lists className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Lists
            </h2>
          </NavLink>
          <NavLink
            to={`/${user.at}`}
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Profile className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Profile
            </h2>
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <More className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              More
            </h2>
          </NavLink>

          <button onClick={openModal} className='btn btn--wide btn--'>
            Tweet
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
                <Exit className='aut1via1qwwkc2ssfu0sy7c6qhr8e4curh64j8vglc0pz0mglc0pz0m__btn__icon' />
              </button>
            </div>
            <div className='auth__nav__content__createTweet__creator'>
              <CreateTweet
                placeholder="What's happening?"
                modal={true}
                fileUploadId='modal'
              />
            </div>
          </Modal>
        </nav>
        {userBox && (
          <div className='auth__nav__content__userBox'>
            <Link
              className='auth__nav__content__user auth__nav__content__user--box'
              to='/dev'
            >
              <img
                src={user.photo}
                className='auth__nav__content__user__photo auth__nav__content__user__photo--box'
                alt='profile'
              />
              <div className='auth__nav__content__user__text'>
                <h3 className='heading-3 auth__nav__content__user__text__name'>
                  {user.name}
                </h3>
                <p className='auth__nav__content__user__text__p'>{user.at}</p>
              </div>
              <Approved className='auth__nav__content__userBox__icon' />
            </Link>
            <Link
              to={`/edit/${user.at}`}
              className='auth__nav__content__userBox__link'
            >
              Edit profile
            </Link>
            <button
              onClick={(e) => handleLogout(e)}
              className='auth__nav__content__userBox__btn'
            >
              Log out {user.at}
            </button>
          </div>
        )}
        <button className='auth__nav__content__user' onClick={handleSetUserBox}>
          <img
            src={user.photo}
            className='auth__nav__content__user__photo'
            alt='profile'
          />
          <div className='auth__nav__content__user__text'>
            <h3 className='heading-3 auth__nav__content__user__text__name'>
              {user.name}
            </h3>
            <p className='auth__nav__content__user__text__p'>{user.at}</p>
          </div>
          <ArrowDown className='auth__nav__content__user__icon' />
        </button>
      </div>
    </section>
  );
};

export default NavBar;
