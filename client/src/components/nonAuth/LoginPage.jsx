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
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleLogin(e)} className='loginPage'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
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
        length={8}
      />
      <button
        className='btn btn--wide'
        disabled={!formData.email || !formData.password ? true : false}
      >
        Zaloguj się
      </button>
      <div className='loginPage__links'>
        <Link to='/forget' className='btn-inline'>
          Nie pamiętasz hasła?
        </Link>
        {' · '}
        <button className='btn-inline'>
          Zarejestruj się, aby korzystać z Twittera
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
