import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, setInitialStates } from '../../actions/auth';

import NavBar from './sidebars/NavBar';
import MobileBottomNav from './sidebars/MobileBottomNav';
import Recommended from './sidebars/Recommended';
import { useMediaQuery } from 'react-responsive';
import { GoBack, Search, SadFace, Profile } from '../../img/Svgs';
import findUsers from '../../selectors/findUsers';
import SearchResult from './sidebars/SearchResult';

const ExplorePage = ({ user, users, logout, setInitialStates, history }) => {
  if (!users) users = [];
  useEffect(() => {
    setInitialStates();
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const [search, setSearch] = useState('');
  const searchedUsers = findUsers(users, search);

  return (
    <section className='auth'>
      {!isMobile ? (
        <NavBar user={user} logout={logout} />
      ) : (
        <MobileBottomNav user={user} />
      )}
      <main className='searchPage searchPage--search'>
        <div className='searchPage__header'>
          <div className='searchPage__header__content'>
            <button
              className='searchPage__header__btn'
              onClick={history.goBack}
            >
              <GoBack className='searchPage__header__icon' />
            </button>
            <span className='heading-2 searchPage__header__heading'>
              Search
            </span>
          </div>
        </div>
        <form className='input-search-container input-search-container--singlePage'>
          <input
            className='input-search input-search--big input-search--singlePage'
            placeholder='Search Twitter'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className='input-search-container__icon input-search-container__icon--big input-search-container__icon--singlePage' />
        </form>
        {search.length > 2 && searchedUsers.length > 0 ? (
          <div className='auth__recommended__content__search-results auth__recommended__content__search-results--singlePage'>
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
        <div className='searchPage__footer'>
          <Profile className='searchPage__footer__icon' />
          <span className='searchPage__footer__text'>
            Type at least 3 letters to search for a user.
          </span>
        </div>
      </main>
      {!isMobile && <Recommended />}
    </section>
  );
};

ExplorePage.propTypes = {
  logout: PropTypes.func.isRequired,
  setInitialStates: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.users.data,
});

export default withRouter(
  connect(mapStateToProps, { logout, setInitialStates })(ExplorePage)
);
