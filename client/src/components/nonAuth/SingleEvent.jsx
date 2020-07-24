import React from 'react';
import { Link } from 'react-router-dom';

const SingleEvent = ({ author, time, text, img }) => {
  return (
    <Link to='/dev' className='nonAuth__content__explore__event'>
      <div className='nonAuth__content__explore__event__info'>
        <p className='nonAuth__content__explore__event__info__author'>
          {author}
        </p>
        <p className='nonAuth__content__explore__event__info__time'>
          {'· ' + time}
        </p>
      </div>
      <h3 className='heading-3 nonAuth__content__explore__event__text'>
        {text}
      </h3>
      <img
        src={img}
        alt='news'
        className='nonAuth__content__explore__event__img'
      />
    </Link>
  );
};

export default SingleEvent;
