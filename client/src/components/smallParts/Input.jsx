import React from 'react';

const Input = ({ type, name, text, value, onChange }) => {
  return (
    <div className='input-container'>
      <input
        className='input'
        type={type}
        value={value}
        name={type}
        onChange={onChange}
      />
      <p className='input-container__p'>{text}</p>
    </div>
  );
};
export default Input;
