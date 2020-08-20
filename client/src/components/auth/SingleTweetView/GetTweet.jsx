import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSingleTweet } from '../../../actions/tweets';
import { v4 as uuidv4 } from 'uuid';

import loadTweets from '../../../selectors/selectTweets';
import InfiniteScroll from 'react-infinite-scroll-component';

import SingleTweet from './SingleTweet';
import Tweet from '../mainContent/tweet/Tweet';
import LoadingGif from '../../../img/loading.gif';

const GetTweet = ({
  user,
  paramTweet,
  getSingleTweet,
  tweets: { loadedTweets, singleTweet, loading },
}) => {
  useEffect(() => {
    getSingleTweet(paramTweet);
  }, [loadedTweets, getSingleTweet, paramTweet]);

  const [isMore, setIsMore] = useState(true);
  const [renderedAmount, setRenderedAmount] = useState(10);

  if (!user || !singleTweet) return null;

  const fetchMoreData = () => {
    if (renderedAmount >= singleTweet.comments.length) {
      setIsMore(false);
      return;
    }
    setRenderedAmount(renderedAmount + 10);
  };

  return loading || paramTweet !== singleTweet._id ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : !loading && singleTweet === null ? (
    <h2 className='heading-3 getTweets__endMessage'>
      There was a problem while loading tweet
    </h2>
  ) : (
    <Fragment>
      <SingleTweet tweet={singleTweet} user={user} />
      {singleTweet.comments.length > 0 && (
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
          {loadTweets(renderedAmount, singleTweet.comments).map((tweet) => (
            <Tweet tweet={tweet} user={user} key={uuidv4()} />
          ))}
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

GetTweet.propTypes = {
  tweets: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tweets: state.tweets,
});

export default connect(mapStateToProps, { getSingleTweet })(GetTweet);
