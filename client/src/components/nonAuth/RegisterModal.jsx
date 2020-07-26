import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import Input from '../smallParts/Input';
import DateSelector from '../smallParts/DateSelector';
import { TwitterLogo } from '../../img/Svgs';
import dates from '../smallParts/dates.json';

//Register modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const RegisterModal = ({ modalIsOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    day: '',
    month: '',
    year: '',
    confirmationCode: '',
    confirmationStage: false,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onDayChange = (sel) => {
    setFormData({
      ...formData,
      day: sel.value,
    });
  };
  const onMonthChange = (sel) => {
    setFormData({
      ...formData,
      month: sel.value,
    });
  };
  const onYearChange = (sel) => {
    setFormData({
      ...formData,
      year: sel.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    await setFormData({
      ...formData,
      confirmationStage: true,
    });
  };

  return !formData.confirmationStage ? (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      ariaHideApp={false}
      className='registerPage'
    >
      <Link to='/' className='logo-link '>
        <TwitterLogo className='logo' />
      </Link>
      <h1 className='heading-1 registerPage__heading'>Utwórz konto</h1>
      <form className='registerPage__form'>
        <Input
          type='text'
          name='name'
          text={'Imię'}
          value={formData.name}
          onChange={onChange}
          length={50}
        />
        <Input
          type='email'
          name='email'
          text={'E-mail'}
          value={formData.email}
          onChange={onChange}
        />
        <Input
          type='password'
          name='password'
          text={'Hasło'}
          value={formData.password}
          onChange={onChange}
        />
        <Input
          type='password'
          name='passwordConfirm'
          text={'Potwierdź hasło'}
          value={formData.passwordConfirm}
          onChange={onChange}
        />
        <h3 className='heading-3 registerPage__heading'>Data urodzenia</h3>
        <p className='registerPage__p'>
          Ta informacja nie będzie widoczna dla innych użytkowników. Podaj swój
          wiek, nawet jeśli jest to konto reprezentujące firmę, zwierzaka lub
          jakąkolwiek inną osobę czy rzecz.
        </p>
        <div className='registerPage__form__date'>
          <DateSelector
            value={{ value: formData.month, label: formData.month }}
            text='Miesiąc'
            onChange={onMonthChange}
            options={dates.optionMonth}
            type='month'
          />
          <DateSelector
            value={{ value: formData.day, label: formData.day }}
            text='Dzień'
            onChange={onDayChange}
            options={dates.optionDay}
            type='day'
          />
          <DateSelector
            value={{ value: formData.year, label: formData.year }}
            text='Rok'
            onChange={onYearChange}
            options={dates.optionYear}
            type='year'
          />
        </div>
        <button
          className='btn registerPage__form__btn '
          onClick={handleRegister}
        >
          Zarejestruj się
        </button>
      </form>
    </Modal>
  ) : (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      ariaHideApp={false}
      className='registerPage'
    >
      <Link to='/' className='logo-link '>
        <TwitterLogo className='logo' />
      </Link>
      <h1 className='heading-1 registerPage__heading'>
        Wysłaliśmy do Ciebie kod
      </h1>
      <form className='registerPage__form'>
        <p className='registerPage__p'>
          Wpisz poniżej w celu weryfikacji kod wysłany na email:{' '}
          {formData.email}
        </p>
        <Input
          type='text'
          name='confirmationCode'
          text={'Kod weryfikacji'}
          value={formData.confirmationCode}
          onChange={onChange}
        />

        <button className='btn registerPage__form__btn'>Potwierdz</button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
