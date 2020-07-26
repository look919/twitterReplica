import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import defaultUser from '../../img/default_profile.png';
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
} from '../../img/Svgs';

const NavBar = () => {
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
            to='/'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Home className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Home
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Explore className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Explore
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Notifications className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Notifications
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Messages className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Messages
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Bookmarks className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Bookmarks
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Lists className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Lists
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <Profile className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              Profile
            </h2>
          </NavLink>
          <NavLink
            to='/test'
            className='auth__nav__content__nav__item'
            activeClassName='auth__nav__content__nav__item--active'
          >
            <More className='auth__nav__content__nav__item__icon' />{' '}
            <h2 className='heading-2 auth__nav__content__nav__item__text'>
              More
            </h2>
          </NavLink>
          <button className='btn btn--wide btn--'>Tweet</button>
        </nav>
        <div className='auth__nav__content__user'>
          <img
            src={defaultUser}
            className='auth__nav__content__user__photo'
            alt='profile'
          />
          <div className='auth__nav__content__user__text'>
            <h3 className='heading-3 auth__nav__content__user__text__name'>
              Default profile
            </h3>
            <p className='auth__nav__content__user__text__p'>@DefaultProfile</p>
          </div>
          <ArrowDown className='auth__nav__content__user__icon' />
        </div>
      </div>
    </section>
  );
};

export default NavBar;
