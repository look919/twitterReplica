import React from 'react';

const Input = ({ type = 'name', name }) => {
  return (
    <div className='input-container'>
      <input className='input' type={type} />
      <p className='input-container__p'>{name}</p>
    </div>
  );
};
export default Input;
