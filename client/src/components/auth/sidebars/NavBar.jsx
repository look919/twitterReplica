import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import CreateTweet from '../mainContent/tweet/CreateTweet';
import defaultUser from '../../../utils/defaultUser.js';

import { useMediaQuery } from 'react-responsive';

import {
  TwitterLogo,
  Home,
  Explore,
  Search,
  Notifications,
  Messages,
  Bookmarks,
  Lists,
  Profile,
  More,
  ArrowDown,
  Approved,
  CreateTweetIcon,
  Exit,
} from '../../../img/Svgs';

const NavBar = ({ user, logout }) => {
  if (!user) user = defaultUser;
  const isLaptopMDPI = useMediaQuery({ query: '(max-width: 1280px)' });
  const isRecommendedNotDisplayed = useMediaQuery({
    query: '(max-width: 1020px)',
  });

  const [userBox, setUserBox] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetUserBox = () => {
    userBox ? setUserBox(false) : setUserBox(true);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
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
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Home
              </h2>
            )}
          </NavLink>
          <NavLink
            to='/explore'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Explore className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Explore
              </h2>
            )}
          </NavLink>
          {isRecommendedNotDisplayed && (
            <NavLink
              to='/search'
              className='auth__nav__content__nav__item'
              activeClassName='auth__nav__content__nav__item--active'
            >
              <Search className='auth__nav__content__nav__item__icon' />{' '}
              {!isLaptopMDPI && (
                <h2 className='heading-2 auth__nav__content__nav__item__text'>
                  Search
                </h2>
              )}
            </NavLink>
          )}
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item auth__nav__content__nav__item--disabled'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Notifications className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Notifications
              </h2>
            )}
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item auth__nav__content__nav__item--disabled'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Messages className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Messages
              </h2>
            )}
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item auth__nav__content__nav__item--disabled'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Bookmarks className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Bookmarks
              </h2>
            )}
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item auth__nav__content__nav__item--disabled'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Lists className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Lists
              </h2>
            )}
          </NavLink>
          <NavLink
            to={`/${user.at}`}
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Profile className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                Profile
              </h2>
            )}
          </NavLink>
          <NavLink
            to='/dev'
            className='auth__nav__content__nav__item auth__nav__content__nav__item--disabled'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <More className='auth__nav__content__nav__item__icon' />{' '}
            {!isLaptopMDPI && (
              <h2 className='heading-2 auth__nav__content__nav__item__text'>
                More
              </h2>
            )}
          </NavLink>
          {!isLaptopMDPI ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className='btn btn--wide'
            >
              Tweet
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className='btn btn--wide auth__nav__content__nav__item__btn'
            >
              <CreateTweetIcon className='auth__nav__content__nav__item__btn__icon' />
            </button>
          )}

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className='auth__nav__content__createTweet'
            ariaHideApp={false}
          >
            <div className='auth__nav__content__createTweet__header'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='auth__nav__content__createTweet__header__btn'
              >
                <Exit className='auth__nav__content__createTweet__header__btn__icon' />
              </button>
            </div>
            <div className='auth__nav__content__createTweet__creator'>
              <CreateTweet
                placeholder="What's happening?"
                fileUploadId='modal'
                modal={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
              />
            </div>
          </Modal>
        </nav>
        {userBox && !isLaptopMDPI && (
          <div className='auth__nav__content__userBox'>
            <Link
              className='auth__nav__content__user auth__nav__content__user--box'
              to={`/${user.at}`}
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
        <button
          className='auth__nav__content__user'
          onClick={!isLaptopMDPI ? handleSetUserBox : handleLogout}
        >
          <img
            src={user.photo}
            className='auth__nav__content__user__photo'
            alt='profile'
          />
          {!isLaptopMDPI && (
            <div className='auth__nav__content__user__text'>
              <h3 className='heading-3 auth__nav__content__user__text__name'>
                {user.name}
              </h3>
              <p className='auth__nav__content__user__text__p'>{user.at}</p>
            </div>
          )}
          {!isLaptopMDPI && (
            <ArrowDown className='auth__nav__content__user__icon' />
          )}
        </button>
      </div>
    </section>
  );
};

export default NavBar;
