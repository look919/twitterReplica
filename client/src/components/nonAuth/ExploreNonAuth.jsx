import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExploreHeader from './ExploreHeader';
import ExploreContent from './ExploreContent';

const ExploreNonAuth = ({ auth: { loading } }) => {
  if (loading) return null;

  return (
    <div className='nonAuth'>
      <ExploreHeader />
      <div className='nonAuth__line'>&nbsp;</div>
      <ExploreContent />
    </div>
  );
};
ExploreNonAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ExploreNonAuth);
