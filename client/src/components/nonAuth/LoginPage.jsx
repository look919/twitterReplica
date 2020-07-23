import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../smallParts/Input';
import { TwitterLogo } from '../../img/Svgs';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='loginPage'>
      <Link to='/' className='logo-link loginPage__logo-link'>
        <TwitterLogo className='logo loginPage__logo' />
      </Link>
      <h1 className='heading-1'>Zaloguj się do Twittera</h1>
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
        value={formData.password}
        text={'Hasło'}
        onChange={onChange}
      />
      <button className='btn btn--wide'>Zaloguj się</button>
      <div className='loginPage__links'>
        <Link to='/forget' className='btn-inline'>
          Nie pamiętasz hasła?
        </Link>
        {' · '}
        <button className='btn-inline'>
          Zarejestruj się, aby korzystać z Twittera
        </button>
      </div>
    </section>
  );
};

export default LoginPage;
