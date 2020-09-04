import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import RegisterModal from './RegisterModal';

import Input from '../smallParts/Input';
import { TwitterLogo } from '../../img/Svgs';
import LoadingGif from '../../img/loading-dark.gif';

const LoginPage = ({ auth: { isAuthenticated, loading }, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loading: false,
  });

  //modalfunc
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    await login(formData);
    setFormData({ ...formData, loading: false });
  };

  if (isAuthenticated && !loading) return <Redirect to='/home' />;

  return (
    <form className='loginPage'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
      </Link>
      <h1 className='heading-1'>Log in to Twitter</h1>
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
        text={'Password'}
        onChange={onChange}
        lengthMin={8}
      />
      {!formData.loading ? (
        <button
          className='btn btn--wide'
          disabled={!formData.email || !formData.password ? true : false}
          onClick={(e) => handleLogin(e)}
        >
          Log in
        </button>
      ) : (
        <button
          className='btn btn--wide'
          disabled={!formData.email || !formData.password ? true : false}
          onClick={(e) => handleLogin(e)}
        >
          <img src={LoadingGif} alt='loading...' className='loading' />
        </button>
      )}

      <div className='loginPage__links'>
        <Link to='/forgot-password' className='btn-inline loginPage__link'>
          Forgot password?
        </Link>
        {' · '}
        <button className='btn-inline loginPage__link' onClick={openModal}>
          Sign up for Twitter
        </button>
      </div>
      <span className='loginPage__p'>
        If you want to login to a test user account and skip registration
        process you can use one of the test users (deleting tweets and editing
        profile funcionalities are disabled).
      </span>
      <span className='loginPage__p'>
        E-mail: user[1-13]@test.com / Example: user7@test.com
      </span>
      <span className='loginPage__p'>Password: qwer1234</span>

      <RegisterModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
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
