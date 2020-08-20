import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Comments,
  Retweets,
  OtherOptions,
  ArrowDown,
  LikesFilled,
} from '../../../img/Svgs';

const SingleProfile = ({ auth: { user, loading }, profile }) => {
  if (loading || !user) return null;

  return (
    <div className='profile'>
      <p>test profile</p>
    </div>
  );
};

SingleProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SingleProfile);
