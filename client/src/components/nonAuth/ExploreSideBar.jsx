import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../smallParts/Input';
import SideBarImg from '../../img/twitter_login_sidebar_illustration.png';
import RegisterModal from './RegisterModal';

const ExploreSideBar = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('click');
  };

  //modalfunc
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  return (
    <form className='nonAuth__content__sidebar'>
      <img
        src={SideBarImg}
        className='nonAuth__content__sidebar__img'
        alt='twitter recommendition'
      />
      <h2 className='heading-2 nonAuth__content__sidebar__heading'>
        Zobacz co się dzieje na świecie w tym momencie.
      </h2>
      <Input
        type='email'
        text={'E-mail'}
        name='email'
        value={formData.email}
        onChange={onChange}
      />
      <Input
        type='password'
        text='Password'
        name='password'
        value={formData.password}
        onChange={onChange}
      />
      <Link to='/forget' className='btn-inline'>
        Nie pamiętasz hasła?
      </Link>
      <button
        onClick={(e) => handleLogin(e)}
        disabled={!formData.email || !formData.password ? true : false}
        className='btn btn--dark btn--wide'
      >
        Zaloguj się
      </button>
      <p className='nonAuth__content__sidebar__p'>lub</p>
      <button onClick={openModal} className='btn btn--wide'>
        Zarejestruj się
      </button>
      <RegisterModal modalIsOpen={modalIsOpen} />
    </form>
  );
};

export default ExploreSideBar;
