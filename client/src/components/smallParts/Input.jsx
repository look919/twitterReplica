import React from 'react';

const Input = ({ type, name, text, value, length = 0, onChange }) => {
  return (
    <div className='input-container'>
      <input
        className='input'
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        minLength={length}
      />
      <p className='input-container__p'>{text}</p>
    </div>
  );
};
export default Input;
