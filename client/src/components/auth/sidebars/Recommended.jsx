import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

import { Search, ArrowDown, SadFace } from '../../../img/Svgs';
import RecommendedTrends from './RecommendedTrends';
import RecommendedToFollow from './RecommendedToFollow';
import SearchResult from './SearchResult';
import findUsers from '../../../selectors/findUsers';
import LoadingGif from '../../../img/loading.gif';

import { useMediaQuery } from 'react-responsive';

const Recommended = ({ auth: { loading, user }, users, logout }) => {
  const isLaptopHiDPI = useMediaQuery({ query: '(max-width: 1440px)' });

  const [search, setSearch] = useState('');
  const searchedUsers = findUsers(users.data, search);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  if (!user && !loading) return null;

  return (
    <nav className='auth__recommended'>
      <div className='auth__recommended__content'>
        <form className='input-search-container'>
          <input
            className='input-search input-search--big'
            placeholder='Search Twitter'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className='input-search-container__icon input-search-container__icon--big' />
        </form>
        {search.length > 2 && searchedUsers.length > 0 ? (
          <div className='auth__recommended__content__search-results__empty'>
            {searchedUsers.map((profile) => (
              <SearchResult user={user} profile={profile} key={profile._id} />
            ))}
          </div>
        ) : (
          search.length > 2 &&
          searchedUsers.length === 0 && (
            <div className='auth__recommended__content__search-results__empty'>
              <SadFace className='auth__recommended__content__search-results__empty__icon' />
              <span className='auth__recommended__content__search-results__empty__text'>
                No such user found
              </span>
            </div>
          )
        )}
        <RecommendedTrends />
        {!users.loading && users.data ? (
          <RecommendedToFollow loggedAccount={user} users={users.data} />
        ) : (
          users.loading && (
            <div className='auth__recommended__content__follow__loading'>
              <img
                src={LoadingGif}
                className='auth__recommended__content__follow__loading__gif loading'
                alt='loading...'
              />
            </div>
          )
        )}
        <div className='auth__recommended__content__footer'>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Terms
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Privacy policy
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Cookies
          </Link>
          <Link to='/dev' className='auth__recommended__content__footer__item'>
            Ads info
          </Link>

          <Link to='/dev' className='auth__recommended__content__footer__item'>
            More{' '}
            <ArrowDown className='auth__recommended__content__footer__item__icon' />
          </Link>
        </div>
        <a
          href='https://www.tomaszwirkus.com/'
          target='_blanc'
          className='auth__recommended__content__footer__item auth__recommended__content__footer__item--copyright'
        >
          2020 - Twitter replica by Wirkus Tomasz,
        </a>
      </div>
      {isLaptopHiDPI && (
        <button
          onClick={(e) => handleLogout(e)}
          className='btn btn--dark auth__recommended__logout'
        >
          Log out
        </button>
      )}
    </nav>
  );
};

Recommended.propTypes = {
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Recommended);
