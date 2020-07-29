import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import defaultUser from '../../../img/default_profile.png';
import {
  AddImage,
  AddGif,
  AddPool,
  AddEmoji,
  AddSchedule,
  Plus,
} from '../../../img/Svgs';

const CreateTweet = () => {
  const [tweetMessage, setTweetMessage] = useState({
    message: '',
    emojiPicker: false,
  });
  const [fillPercentage, setFillPercentage] = useState(
    (tweetMessage.message.length / 240) * 100
  );

  const addToMessage = (emoji) => {
    setTweetMessage({
      ...tweetMessage,
      message: `${tweetMessage.message}${emoji}`,
      emojiPicker: false,
    });
    setFillPercentage((tweetMessage.message.length / 240) * 100);
  };
  const openEmojiPicker = () => {
    setTweetMessage({
      ...tweetMessage,
      emojiPicker: true,
    });
  };
  const onChange = (e) => {
    setTweetMessage({
      ...tweetMessage,
      [e.target.name]: e.target.value,
    });
    setFillPercentage((tweetMessage.message.length / 240) * 100);
  };

  return (
    <div className='mainContent__createTweet'>
      <div className='mainContent__createTweet__img'>
        <img
          src={defaultUser}
          className='mainContent__createTweet__img__photo'
          alt='user'
        />
      </div>
      <div className='mainContent__createTweet__tweet'>
        <div className='mainContent__createTweet__tweet__text'>
          <input
            autoComplete='off'
            value={tweetMessage.message}
            name='message'
            onChange={onChange}
            className='mainContent__createTweet__tweet__text__input'
            placeholder="What's happening?"
            maxLength={240}
          />
        </div>
      </div>
      <div className='mainContent__createTweet__options'>
        <Link
          to='/dev'
          className='mainContent__createTweet__options__iconHandler'
        >
          <AddImage className='mainContent__createTweet__options__icon' />
        </Link>
        <Link
          to='/dev'
          className='mainContent__createTweet__options__iconHandler'
        >
          <AddGif className='mainContent__createTweet__options__icon' />
        </Link>
        <Link
          to='/dev'
          className='mainContent__createTweet__options__iconHandler'
        >
          <AddPool className='mainContent__createTweet__options__icon' />
        </Link>
        {!tweetMessage.emojiPicker ? (
          <button
            onClick={openEmojiPicker}
            className='mainContent__createTweet__options__icon__btn mainContent__createTweet__options__iconHandler'
          >
            <AddEmoji className='mainContent__createTweet__options__icon' />
          </button>
        ) : (
          <Picker
            className='mainContent__createTweet__options__emojiPicker'
            onSelect={(emoji) => addToMessage(emoji.native)}
          />
        )}
        <Link
          to='/dev'
          className='mainContent__createTweet__options__iconHandler'
        >
          <AddSchedule className='mainContent__createTweet__options__icon' />
        </Link>
        {tweetMessage.message && (
          <Fragment>
            <CircularProgressbar
              value={fillPercentage}
              text=''
              className='mainContent__createTweet__options__fillProgress'
              maxValue={101}
              background={true}
              styles={{
                pathColor: `#253341`,
                background: {
                  fill: '#15202b',
                },
              }}
            />
            <div className='mainContent__createTweet__options__line'>
              &nbsp;
            </div>
            <Plus className='mainContent__createTweet__options__icon' />
          </Fragment>
        )}

        <button className='btn mainContent__createTweet__options__btn'>
          Tweet
        </button>
      </div>
    </div>
  );
};
export default CreateTweet;
