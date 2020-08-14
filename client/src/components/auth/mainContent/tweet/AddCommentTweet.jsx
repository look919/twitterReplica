import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import CreateTweet from './CreateTweet';

import moment from 'moment';
import findLinksInText from '../../../../utils/findLinksInText';
import emoji from 'react-easy-emoji';
import { Exit } from '../../../../img/Svgs';

const AddCommentTweet = ({ isOpen, closeModal, tweet }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='comment'
      ariaHideApp={false}
    >
      <button onClick={closeModal} className='comment__header'>
        <Exit className='comment__header__icon' />
      </button>
      <div className='comment__container'>
        <section className='tweet'>
          <div className='tweet__img'>
            <img
              src={tweet.user.photo}
              className='tweet__img__photo'
              alt='user'
            />
            <span className='comment__replyLine'>&nbsp;</span>
          </div>
          <div className='tweet__content'>
            <div className='tweet__content__author'>
              <span className='tweet__content__author__name'>
                {tweet.user.name}
              </span>
              <span className='tweet__content__author__at'>
                {tweet.user.at}
              </span>
              <span className='tweet__content__author__dot'>{' · '}</span>
              <span className='tweet__content__author__time'>
                {moment(tweet.createdAt).fromNow()}
              </span>
            </div>
            <div className='tweet__content__text'>
              <div>{findLinksInText(emoji(tweet.message))}</div>
            </div>
            <div className='comment__replyTo'>
              Replying to{' '}
              <Link to='/dev' className='comment__replyTo__at'>
                {tweet.user.at}
              </Link>
            </div>
          </div>
        </section>
        <CreateTweet placeholder='Tweet your reply' reply={tweet._id} />
      </div>
    </Modal>
  );
};

export default AddCommentTweet;
