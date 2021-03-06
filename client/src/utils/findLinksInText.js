import React from 'react';
import { Link } from 'react-router-dom';
import processString from 'react-process-string';

let config = [
  {
    regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
    fn: (key, result) => (
      <span key={key}>
        <a
          className='tweet__content__text__link'
          target='_blank'
          rel='noopener noreferrer'
          id='randomlinkintext'
          href={`${result[1]}://${result[2]}.${result[3]}${
            result[4] && result[4]
          }
        `}
        >
          {result[2]}.{result[3]}
          {result[4]}
        </a>
        {result[5]}
      </span>
    ),
  },
  {
    regex: /(^|\s)(#[A-Za-z\d-]+)/,
    fn: (key, result) => (
      <span key={key}>
        {' '}
        <Link
          className='tweet__content__text__link'
          id='randomlinkintext-hashtag'
          to={`/search#${result[2].substring(1)}`}
        >
          {result[0]}
        </Link>
      </span>
    ),
  },
  {
    regex: /(^|\s)(@[A-Za-z\d-]+)/,
    fn: (key, result) => (
      <span key={key}>
        {' '}
        <Link
          className='tweet__content__text__link'
          id='randomlinkintext-user'
          to={`/${result[2].toLowerCase()}`}
        >
          {result[2]}
        </Link>
      </span>
    ),
  },
];

export default (keyWord) => processString(config)(keyWord);
