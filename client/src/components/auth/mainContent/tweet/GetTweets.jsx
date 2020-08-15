import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTweets } from '../../../../actions/tweets';
import { v4 as uuidv4 } from 'uuid';

import loadTweets from '../../../../selectors/loadTweets';

import Tweet from './Tweet';
import LoadingGif from '../../../../img/loading.gif';

const GetAllTweets = ({
  user,
  getTweets,
  tweets: { loadedTweets, loading },
}) => {
  useEffect(() => {
    getTweets();
  }, [getTweets]);

  return loading ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : (
    <Fragment>
      {loadedTweets.map((tweet) => (
        <Tweet tweet={tweet} user={user} key={uuidv4()} />
      ))}
    </Fragment>
  );
};

GetAllTweets.propTypes = {
  tweets: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

export default connect(mapStateToProps, { getTweets })(GetAllTweets);
