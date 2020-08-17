import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ReactGiphySearchbox from 'react-giphy-searchbox';
import TextareaAutosize from 'react-textarea-autosize';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { connect } from 'react-redux';
import { createTweet } from '../../../../actions/tweets';
import PropTypes from 'prop-types';

import defaultUser from '../../../../utils/defaultUser';
import {
  AddImage,
  AddGif,
  AddPool,
  AddEmoji,
  AddSchedule,
  Plus,
} from '../../../../img/Svgs';

const CreateTweet = ({
  user: { user },
  createTweet,
  placeholder,
  reply = '',
}) => {
  if (!user) user = defaultUser;

  const [tweet, setTweet] = useState({
    message: '',
    emojiPicker: false,
    gifPicker: false,
    imgOrGif: '',
    ref: reply,
    retweet: false,
  });
  const [fillPercentage, setFillPercentage] = useState(
    (tweet.message.length / 240) * 100
  );

  useEffect(() => {
    setTweet({
      ...tweet,
      userId: user._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToMessage = (emoji) => {
    setTweet({
      ...tweet,
      message: `${tweet.message}${emoji}`,
      emojiPicker: false,
      gifPicker: false,
    });
    setFillPercentage((tweet.message.length / 240) * 100);
  };
  const addGifToTweet = (item) => {
    setTweet({
      ...tweet,
      imgOrGif: item.id,
      gifPicker: false,
    });
  };
  const openEmojiPicker = () => {
    setTweet({
      ...tweet,
      emojiPicker: true,
    });
  };
  const openGifPicker = () => {
    setTweet({
      ...tweet,
      gifPicker: true,
    });
  };
  const onChange = (e) => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    });
    setFillPercentage((tweet.message.length / 240) * 100);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createTweet(tweet);

    setTweet({
      ...tweet,
      message: '',
      emojiPicker: false,
      gifPicker: false,
      imgOrGif: '',
      ref: '',
    });
  };

  return (
    <div className='createTweet'>
      <div className='createTweet__img'>
        <img src={user.photo} className='createTweet__img__photo' alt='user' />
      </div>
      <div className='createTweet__tweet'>
        <div className='createTweet__tweet__text'>
          <TextareaAutosize
            autoComplete='off'
            value={tweet.message}
            name='message'
            onChange={onChange}
            className='createTweet__tweet__text__textarea'
            placeholder={placeholder}
            maxLength={240}
          />
        </div>
      </div>
      <div className='createTweet__options'>
        <Link to='/dev' className='createTweet__options__iconHandler'>
          <AddImage className='createTweet__options__icon' />
        </Link>

        {!tweet.gifPicker ? (
          <button
            onClick={openGifPicker}
            className='createTweet__options__icon__btn mainContent__createTweet__options__iconHandler'
          >
            <AddGif className='createTweet__options__icon' />
          </button>
        ) : (
          <ReactGiphySearchbox
            apiKey='YRLT8egMiEDkhBgx1AR2sQh0CkWYl5kr'
            onSelect={(gif) => addGifToTweet(gif)}
          />
        )}

        <Link to='/dev' className='createTweet__options__iconHandler'>
          <AddPool className='createTweet__options__icon' />
        </Link>
        {!tweet.emojiPicker ? (
          <button
            onClick={openEmojiPicker}
            className='createTweet__options__icon__btn mainContent__createTweet__options__iconHandler'
          >
            <AddEmoji className='createTweet__options__icon' />
          </button>
        ) : (
          <Picker
            className='createTweet__options__emojiPicker'
            onSelect={(emoji) => addToMessage(emoji.native)}
          />
        )}
        <Link to='/dev' className='createTweet__options__iconHandler'>
          <AddSchedule className='createTweet__options__icon' />
        </Link>
        {tweet.message && (
          <Fragment>
            <CircularProgressbar
              value={fillPercentage}
              text=''
              className='createTweet__options__fillProgress'
              maxValue={101}
              background={true}
              styles={{
                pathColor: `#253341`,
                background: {
                  fill: '#15202b',
                },
              }}
            />
            <div className='createTweet__options__line'>&nbsp;</div>
            <Plus className='createTweet__options__icon' />
          </Fragment>
        )}

        <button
          onClick={(e) => onSubmit(e)}
          className='btn mainContent__createTweet__options__btn'
          disabled={!tweet.message}
        >
          {!reply ? 'Tweet' : 'Reply'}
        </button>
      </div>
    </div>
  );
};

CreateTweet.propTypes = {
  createTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { createTweet })(CreateTweet);
