import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTweets } from '../../../../actions/tweets';
import { v4 as uuidv4 } from 'uuid';

import loadTweets from '../../../../selectors/selectTweets';
import InfiniteScroll from 'react-infinite-scroll-component';

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

  const [isMore, setIsMore] = useState(true);
  const [renderedAmount, setRenderedAmount] = useState(10);

  const fetchMoreData = () => {
    if (renderedAmount >= loadedTweets.length) {
      setIsMore(false);
      return;
    }

    setRenderedAmount(renderedAmount + 10);
  };
  return loading ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : !loading && loadedTweets.length === 0 ? (
    <h2 className='heading-3 getTweets__endMessage'>
      For more tweets follow more users!
    </h2>
  ) : (
    <Fragment>
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
        endMessage={
          <h2 className='heading-3 getTweets__endMessage'>
            For more tweets follow more users!
          </h2>
        }
      >
        {loadTweets(renderedAmount, loadedTweets).map((tweet) => (
          <Tweet tweet={tweet} user={user} key={uuidv4()} />
        ))}
      </InfiniteScroll>
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
