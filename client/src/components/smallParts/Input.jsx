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
    <div className='input-container'>
      <input
        className={value ? 'input input--borderBlue' : 'input'}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        maxLength={length}
        minLength={lengthMin}
        autoComplete='off'
      />
      <p className='input-container__p'>{text}</p>
    </div>
  );
};
export default Input;
