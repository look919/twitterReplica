import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSingleTweet } from '../../../actions/tweets';
import { v4 as uuidv4 } from 'uuid';

import loadTweets from '../../../selectors/selectTweets';
import InfiniteScroll from 'react-infinite-scroll-component';

import SingleProfile from './SingleProfile';
import Tweet from '../mainContent/tweet/Tweet';
import LoadingGif from '../../../img/loading.gif';

const GetProfile = ({
  user,
  paramTweet,
  getSingleTweet,
  tweets: { loadedTweets },
  singleTweet: { tweet, loading },
}) => {
  useEffect(() => {
    //getSingleTweet(paramTweet);
  }, [loadedTweets, getSingleTweet, paramTweet]);

  const [isMore, setIsMore] = useState(true);
  const [renderedAmount, setRenderedAmount] = useState(10);

  if (!user || !tweet) return null;

  const fetchMoreData = () => {
    if (renderedAmount >= tweet.comments.length) {
      setIsMore(false);
      return;
    }
    setRenderedAmount(renderedAmount + 10);
  };

  return loading || paramTweet !== tweet._id ? (
    <div className='getTweets'>
      <img src={LoadingGif} className='getTweets__loading' alt='loading...' />
    </div>
  ) : !loading && tweet === null ? (
    <h2 className='heading-3 getTweets__endMessage'>
      There was a problem while loading tweet
    </h2>
  ) : (
    <Fragment>
      <SingleProfile tweet={tweet} user={user} />
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

GetProfile.propTypes = {
  tweets: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  tweets: state.tweets,
  singleTweet: state.singleTweet,
});

export default connect(mapStateToProps, { getSingleTweet })(GetProfile);
