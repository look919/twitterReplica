import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import Input from '../smallParts/Input';
import SideBarImg from '../../img/twitter_login_sidebar_illustration.png';
import RegisterModal from './RegisterModal';

const ExploreSideBar = ({ login }) => {
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

    login(formData);
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
        See what's happening in the world at this moment.
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
        Forgot your password?
      </Link>
      <button
        onClick={(e) => handleLogin(e)}
        disabled={!formData.email || !formData.password ? true : false}
        className='btn btn--dark btn--wide'
      >
        Log in
      </button>
      <p className='nonAuth__content__sidebar__p'>or</p>
      <button onClick={openModal} className='btn btn--wide'>
        Sign up
      </button>
      <RegisterModal modalIsOpen={modalIsOpen} />
    </form>
  );
};
ExploreSideBar.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(ExploreSideBar);
