import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import Input from '../smallParts/Input';
import { TwitterLogo } from '../../img/Svgs';

const LoginPage = ({ auth: { isAuthenticated, loading }, login }) => {
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
  const handleLogin = async (e) => {
    e.preventDefault();

    await login(formData);
  };
  if (isAuthenticated && !loading) return <Redirect to='/home' />;

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
        onClick={(e) => handleLogin(e)}
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

LoginPage.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(LoginPage);
