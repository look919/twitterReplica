import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPassword, resetPassword } from '../../actions/auth';

import Input from '../smallParts/Input';
import { TwitterLogo } from '../../img/Svgs';
import LoadingGif from '../../img/loading-dark.gif';

const PasswordResetPage = ({
  forgotten,
  forgotPassword,
  resetPassword,
  ...props
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    error: false,
    loading: false,
  });

  const { email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordForget = async (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setFormData({ ...formData, loading: true, error: false });
      await forgotPassword(email);
      setFormData({ ...formData, loading: false });
    } else {
      setFormData({
        ...formData,
        error: true,
      });
    }
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password.length >= 8 && password === passwordConfirm) {
      setFormData({ ...formData, loading: true, error: false });
      await resetPassword(
        formData.password,
        formData.passwordConfirm,
        props.match.params.token
      );
      setFormData({ ...formData, loading: false });
    } else {
      setFormData({
        ...formData,
        error: true,
      });
    }
  };

  return (
    <form className='passwordReset'>
      <Link to='/' className='logo-link logo-link--big'>
        <TwitterLogo className='logo logo--big' />
      </Link>
      {forgotten ? (
        <Fragment>
          <h1 className='heading-1'>Password forgotten</h1>
          <Input
            type='email'
            name='email'
            text={'E-mail'}
            value={formData.email}
            onChange={onChange}
          />
          {!formData.loading ? (
            <button
              className='btn btn--wide'
              disabled={!formData.email ? true : false}
              onClick={(e) => handlePasswordForget(e)}
            >
              {!formData.error ? 'Send reset password link' : 'Invalid data'}
            </button>
          ) : (
            <button
              className='btn btn--wide'
              disabled={!formData.email ? true : false}
              onClick={(e) => handlePasswordForget(e)}
            >
              <img src={LoadingGif} alt='loading...' className='loading' />
            </button>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <h1 className='heading-1'>Set new password</h1>
          <Input
            type='password'
            name='password'
            text={'New Password'}
            value={formData.password}
            onChange={onChange}
            lengthMin={8}
          />
          <Input
            type='password'
            name='passwordConfirm'
            value={formData.passwordConfirm}
            text={'New password Confirm'}
            onChange={onChange}
            lengthMin={8}
          />
          {!formData.loading ? (
            <button
              className='btn btn--wide'
              disabled={
                !formData.password || !formData.passwordConfirm ? true : false
              }
              onClick={(e) => handlePasswordReset(e)}
            >
              {!formData.error ? 'Set new password' : 'Invalid data'}
            </button>
          ) : (
            <button
              className='btn btn--wide'
              disabled={
                !formData.password || !formData.passwordConfirm ? true : false
              }
              onClick={(e) => handlePasswordReset(e)}
            >
              <img src={LoadingGif} alt='loading...' className='loading' />
            </button>
          )}
        </Fragment>
      )}

      <div className='passwordReset__links'>
        <Link to='/login' className='btn-inline passwordReset__link'>
          Login &rarr;
        </Link>
      </div>
    </form>
  );
};

PasswordResetPage.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword, resetPassword })(
  PasswordResetPage
);
