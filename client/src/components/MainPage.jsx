import React from 'react';
import ExploreAuth from './auth/ExploreAuth';
import ExploreNonAuth from './nonAuth/ExploreNonAuth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MainPage = ({ auth: { isAuthenticated, loading } }) => (
  <div className='container'>
    {isAuthenticated && !loading ? <ExploreAuth /> : <ExploreNonAuth />}
  </div>
);

MainPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MainPage);
