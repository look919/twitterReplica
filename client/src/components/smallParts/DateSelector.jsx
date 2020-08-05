import React from 'react';
import Select from 'react-select';

const DateSelector = ({ options, text, value, onChange, type }) => {
  return (
    <div
      className={
        value.label
          ? `input-container input-container--${type} input-container--borderBlue`
          : `input-container input-container--${type}`
      }
    >
      <Select
        className={`dateSelector dateSelector--${type}`}
        options={options}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <p className='input-container__p'>{text}</p>
    </div>
  );
};
export default DateSelector;
