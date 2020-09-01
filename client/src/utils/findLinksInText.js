import React from 'react';
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
];

export default (keyWord) => processString(config)(keyWord);
