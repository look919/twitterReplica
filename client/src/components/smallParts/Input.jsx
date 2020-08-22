import React from 'react';

const Input = ({
  type,
  name,
  text,
  value,
  length = 50,
  onChange,
  lengthMin = 0,
}) => {
  return (
    <div className='input-container' tabIndex='1'>
      <input
        className={value ? 'input input--borderBlue' : 'input'}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        maxLength={length}
        minLength={lengthMin}
        autoComplete='off'
        tabIndex='2'
      />
      <p className='input-container__p'>{text}</p>
    </div>
  );
};
export default Input;
