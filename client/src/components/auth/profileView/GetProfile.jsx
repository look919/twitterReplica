import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfile } from '../../../actions/user';
import { v4 as uuidv4 } from 'uuid';

import loadTweets from '../../../selectors/selectTweets';
import InfiniteScroll from 'react-infinite-scroll-component';

import SingleProfile from './SingleProfile';
import Tweet from '../mainContent/tweet/Tweet';
import LoadingGif from '../../../img/loading.gif';

const GetProfile = ({
  user,
  paramUser,
  getProfile,
  tweets: { loadedTweets },
  profile: { data, loading },
}) => {
  useEffect(() => {
    getProfile(paramUser);
  }, [loadedTweets, getProfile, paramUser]);

  const [isMore, setIsMore] = useState(true);
  const [renderedAmount, setRenderedAmount] = useState(10);

  const fetchMoreData = () => {
    if (renderedAmount >= data.tweets.length) {
      setIsMore(false);
      return;
    }
    setRenderedAmount(renderedAmount + 10);
  };

  return loading || paramUser !== data.at || !user ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : !loading && data === null ? (
    <h2 className='heading-3 getTweets__endMessage'>
      There was a problem while loading tweet
    </h2>
  ) : (
    <Fragment>
      <SingleProfile profile={data} user={user} />

      {data.tweets.length > 0 && (
        <InfiniteScroll
          dataLength={renderedAmount}
          next={fetchMoreData}
          hasMore={isMore}
          loader={
            <div className='getTweets'>
              <img
                src={LoadingGif}
                className='getTweets__loading'
                alt='loading...'
              />
            </div>
          }
        >
          {loadTweets(renderedAmount, data.tweets).map((tweet) => (
            <Tweet tweet={tweet} user={user} key={uuidv4()} />
          ))}
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

GetProfile.propTypes = {
  tweets: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tweets: state.tweets,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(GetProfile);
