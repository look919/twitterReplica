import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import loadingGif from '../../img/loading-dark.gif';

import { register, activate } from '../../actions/auth';
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

const RegisterModal = ({
  auth: { isAuthenticated, loading, activationStage },
  register,
  activate,
  modalIsOpen,
  closeModal,
}) => {
  let refContainer = useRef(activationStage);
  refContainer.current = activationStage;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    day: '01',
    monthValue: '01',
    monthLabel: 'January',
    year: '2020',
    activationCode: '',
    confirmationStage: false,
    loading: false,
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
    //diffrence in month saving due its hard to convert to Date string like 01-February-2020
    setFormData({
      ...formData,
      monthValue: sel.value,
      monthLabel: sel.label,
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
      loading: true,
    });
    const {
      name,
      email,
      password,
      passwordConfirm,
      confirmationStage,
      activationCode,
    } = formData;
    const dateOfBirth = moment(
      `${formData.year}-${formData.monthValue}-${formData.day}T10:00:00`,
      ['YYYY-MMMM-DD', 'DD-MM-YYYY']
    );

    if (!confirmationStage) {
      //registration stage
      await register(name, email, password, passwordConfirm, dateOfBirth);

      if (refContainer.current) {
        await setFormData({
          ...formData,
          confirmationStage: true,
          loading: false,
        });
      }
    } else {
      await activate({ email, activationCode });
    }
  };

  if (isAuthenticated && !loading) return <Redirect to='/home' />;

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
            value={{ value: formData.monthValue, label: formData.monthLabel }}
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
        {!formData.loading ? (
          <button
            className='btn registerPage__form__btn '
            onClick={handleRegister}
            disabled={
              !(
                formData.name &&
                formData.email &&
                formData.password &&
                formData.passwordConfirm
              )
            }
          >
            Zarejestruj się
          </button>
        ) : (
          <button
            onClick={(e) => e.preventDefault()}
            className='btn registerPage__form__btn'
          >
            <img
              src={loadingGif}
              className='registerPage__form__btn__gif'
              alt='loading...'
            />
          </button>
        )}
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
          name='activationCode'
          text={'Kod weryfikacji'}
          value={formData.activationCode}
          onChange={onChange}
        />
        {!formData.loading ? (
          <button
            className='btn registerPage__form__btn'
            onClick={(e) => handleRegister(e)}
          >
            Potwierdz
          </button>
        ) : (
          <button
            onClick={(e) => e.preventDefault()}
            className='btn registerPage__form__btn'
          >
            <img
              src={loadingGif}
              className='registerPage__form__btn__gif'
              alt='loading...'
            />
          </button>
        )}
      </form>
    </Modal>
  );
};

RegisterModal.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { register, activate })(RegisterModal)
);
