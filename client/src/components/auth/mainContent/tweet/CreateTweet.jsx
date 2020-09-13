import React, { useState, useEffect, Fragment } from 'react';

import ReactGiphySearchbox from 'react-giphy-searchbox';
import TextareaAutosize from 'react-textarea-autosize';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { connect } from 'react-redux';
import { createTweet } from '../../../../actions/tweets';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import LoadingGif from '../../../../img/loading.gif';
import defaultUser from '../../../../utils/defaultUser';
import {
  AddImage,
  AddGif,
  AddPool,
  AddEmoji,
  AddSchedule,
  Plus,
  Exit,
} from '../../../../img/Svgs';

const CreateTweet = ({
  user: { user },
  createTweet,
  placeholder,
  fileUploadId,
  reply = '',
  modal = false,
  closeModal,
}) => {
  if (!user) user = defaultUser;
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  const [tweet, setTweet] = useState({
    message: '',
    emojiPicker: false,
    gifPicker: false,
    imgOrGif: '',
    imgOrGifName: '',
    ref: reply,
    retweet: false,
    loading: false,
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
  useEffect(() => {
    setFillPercentage((tweet.message.length / 240) * 100);
  }, [tweet.message]);

  //tweet func
  const onChange = (e) => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    });
  };
  const addEmojiToTweet = (emoji) => {
    setTweet({
      ...tweet,
      message: `${tweet.message}${emoji}`,
      emojiPicker: false,
      gifPicker: false,
    });
  };
  const addGifToTweet = (item) => {
    setTweet({
      ...tweet,
      imgOrGif: item.id,
      imgOrGifName: item.title,
      gifPicker: false,
    });
  };
  const addImgToTweet = (e) => {
    if (e.target.files[0]) {
      setTweet({
        ...tweet,
        imgOrGif: e.target.files[0],
        imgOrGifName: e.target.files[0].name,
      });
    }
  };
  const openEmojiPicker = () => {
    setTweet({
      ...tweet,
      gifPicker: false,
      emojiPicker: true,
    });
  };
  const openGifPicker = () => {
    setTweet({
      ...tweet,
      emojiPicker: false,
      gifPicker: true,
    });
  };
  const closeEmojiOrGifPicker = (e) => {
    e.stopPropagation();

    setTweet({
      ...tweet,
      gifPicker: false,
      emojiPicker: false,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setTweet({
      ...tweet,
      loading: true,
    });

    await createTweet(tweet);

    if (!modal) {
      setTweet({
        ...tweet,
        loading: false,
        message: '',
        emojiPicker: false,
        imgOrGifName: '',
        gifPicker: false,
        imgOrGif: '',
      });
    } else {
      if (closeModal) closeModal();
    }
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
          {tweet.imgOrGifName && (
            <span className='createTweet__tweet__attached'>
              Attached: {tweet.imgOrGifName}
            </span>
          )}
        </div>
      </div>
      <div className='createTweet__options'>
        <input
          type='file'
          accept='image/*'
          id={fileUploadId}
          onChange={addImgToTweet}
          className='createTweet__options__fileInput'
        />
        <label
          htmlFor={fileUploadId}
          className='createTweet__options__iconHandler createTweet__options__iconHandler--label'
        >
          <AddImage className='createTweet__options__icon' />
        </label>

        {!tweet.gifPicker ? (
          <button
            onClick={openGifPicker}
            className='createTweet__options__icon__btn createTweet__options__iconHandler'
          >
            <AddGif className='createTweet__options__icon' />
          </button>
        ) : (
          <div className='gifPicker'>
            <button className='gifPicker__btn' onClick={closeEmojiOrGifPicker}>
              <Exit className='createTweet__options__icon' />
            </button>

            <ReactGiphySearchbox
              apiKey='YRLT8egMiEDkhBgx1AR2sQh0CkWYl5kr'
              onSelect={(gif) => addGifToTweet(gif)}
            />
          </div>
        )}

        {!isMobile && (
          <button className='createTweet__options__iconHandler' disabled>
            <AddPool className='createTweet__options__icon createTweet__options__icon--disabled' />
          </button>
        )}
        {!tweet.emojiPicker ? (
          <button
            onClick={openEmojiPicker}
            className={
              !isMobile
                ? 'createTweet__options__icon__btn createTweet__options__iconHandler'
                : 'createTweet__options__icon__btn createTweet__options__iconHandler createTweet__options__iconHandler--last'
            }
          >
            <AddEmoji className='createTweet__options__icon' />
          </button>
        ) : (
          <div className='emojiMartBox'>
            <button
              className='emojiMartBox__btn'
              onClick={closeEmojiOrGifPicker}
            >
              <Exit className='createTweet__options__icon' />
            </button>

            <Picker
              className='createTweet__options__emojiPicker'
              onSelect={(emoji) => addEmojiToTweet(emoji.native)}
            />
          </div>
        )}
        {!isMobile && (
          <button
            className='createTweet__options__iconHandler createTweet__options__iconHandler--last'
            disabled
          >
            <AddSchedule className='createTweet__options__icon createTweet__options__icon--disabled' />
          </button>
        )}
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
            <Plus className='createTweet__options__icon createTweet__options__icon--disabled' />
          </Fragment>
        )}
        {!tweet.loading ? (
          <button
            onClick={(e) => onSubmit(e)}
            className='btn createTweet__options__btn'
            disabled={!tweet.message}
          >
            {!reply ? 'Tweet' : 'Reply'}
          </button>
        ) : (
          <img
            src={LoadingGif}
            className='createTweet__options__btn__loading'
            alt='loading..'
          />
        )}
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
