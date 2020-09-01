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
  tweets: { loadedTweets },
  singleTweet: { tweet, loading },
}) => {
  useEffect(() => {
    getSingleTweet(paramTweet);
    window.scrollTo(0, 0);
  }, [loadedTweets, getSingleTweet, paramTweet]);

  const [isMore, setIsMore] = useState(true);
  const [renderedAmount, setRenderedAmount] = useState(10);

  const fetchMoreData = () => {
    if (renderedAmount >= tweet.comments.length) {
      setIsMore(false);
      return;
    }
    setRenderedAmount(renderedAmount + 10);
  };

  return loading || !user ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : !loading && !tweet ? (
    <h2 className='heading-3 getTweets__endMessage'>
      There was a problem while loading tweet
    </h2>
  ) : (
    <Fragment>
      <SingleTweet tweet={tweet} user={user} />

      {tweet.comments.length > 0 && (
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
          {loadTweets(renderedAmount, tweet.comments).map((tweet) => (
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
  singleTweet: state.singleTweet,
});

export default connect(mapStateToProps, { getSingleTweet })(GetTweet);
