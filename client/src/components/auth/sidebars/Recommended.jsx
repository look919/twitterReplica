import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Search, ArrowDown } from '../../../img/Svgs';
import RecommendedTrends from './RecommendedTrends';
import RecommendedToFollow from './RecommendedToFollow';

const Recommended = ({ auth: { loading, user }, users }) => {
  if (!user && !loading) return null;

  return (
    <nav className='auth__recommended'>
      <div className='auth__recommended__content'>
        <form className='input-search-container'>
          <input
            className='input-search input-search--big'
            placeholder='Search Twitter'
          />
          <Search className='input-search-container__icon input-search-container__icon--big' />
        </form>
        <RecommendedTrends />

        {!users.loading && users.data && (
          <RecommendedToFollow loggedAccount={user} users={users.data} />
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
        <Link
          to='/dev'
          className='auth__recommended__content__footer__item auth__recommended__content__footer__item--copyright'
        >
          &copy; 2020 Twitter replica by Wirkus Tomasz
        </Link>
      </div>
    </nav>
  );
};

Recommended.propTypes = {
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Recommended);
