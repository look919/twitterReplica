import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  SadFace,
  Unfollow,
  Mute,
  Block,
  DeleteTweet,
} from '../../../../img/Svgs';

//This component is also responsible for deleting tweets if its ours.
const ReportBox = ({ eventListener, deleteFunc, del = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [btnStyle, setBtnStyle] = useState('flex');

  function closeModal() {
    setIsOpen(false);
  }

  const openModalAndHideBtn = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setBtnStyle('none');
    setIsOpen(true);
  };

  return del ? (
    <div className='tweet__content__author__box tweet__content__author__box--short'>
      <button
        onClick={(e) => openModalAndHideBtn(e)}
        value='spam'
        className='tweet__content__author__box__btn tweet__content__author__box__btn--delete'
        style={{ display: btnStyle }}
      >
        <DeleteTweet className='tweet__content__author__box__btn__icon tweet__content__author__box__btn__icon--delete' />{' '}
        Delete
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className='tweet__delete'
        ariaHideApp={false}
      >
        <h2 className='heading-2'>Delete Tweet?</h2>
        <span className='tweet__delete__text'>
          This can't be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from Twitter search
          results.
        </span>
        <div className='tweet__delete__btns'>
          <button
            onClick={() => setIsOpen(false)}
            className='btn tweet__delete__btns__btn tweet__delete__btns__btn--cancel'
          >
            Cancel
          </button>
          <button
            onClick={(e) => deleteFunc(e)}
            className='btn tweet__delete__btns__btn tweet__delete__btns__btn--del'
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  ) : (
    <div className='tweet__content__author__box'>
      <button
        onClick={(e) => eventListener(e)}
        value='spam'
        className='tweet__content__author__box__btn'
      >
        <SadFace className='tweet__content__author__box__btn__icon' /> Not
        intrested in this Tweet
      </button>
      <button
        onClick={(e) => eventListener(e)}
        className='tweet__content__author__box__btn'
        value='insulting'
      >
        <Unfollow className='tweet__content__author__box__btn__icon' /> Unfollow
        DefaultUser
      </button>
      <button
        onClick={(e) => eventListener(e)}
        value='plagiarism'
        className='tweet__content__author__box__btn'
      >
        <Mute className='tweet__content__author__box__btn__icon' /> Mute
        DefaultUser
      </button>
      <button
        onClick={(e) => eventListener(e)}
        value='lowQuality'
        className='tweet__content__author__box__btn'
      >
        <Block className='tweet__content__author__box__btn__icon' /> Block
        DefaultUser
      </button>
    </div>
  );
};

export default ReportBox;
