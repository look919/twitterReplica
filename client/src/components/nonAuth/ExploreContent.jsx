import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../smallParts/Input';
import SideBarImg from '../../img/twitter_login_sidebar_illustration.png';

const ExploreContent = () => {
  return (
    <section className='nonAuth__content'>
      <div className='nonAuth__content__explore'>explore</div>
      <div className='nonAuth__content__sidebar'>
        <img src={SideBarImg} className='nonAuth__content__sidebar__img' />
        <h2 className='heading-4 nonAuth__content__sidebar__heading'>
          Zobacz co się dzieje na świecie w tym momencie.
        </h2>
        <Input type='text' name='E-mail' />
        <Input type='password' name='Hasło' />
        <Link to='/' className='btn-inline'>
          Nie pamiętasz hasła?
        </Link>
        <btn className='btn btn--dark btn--wide'>Zaloguj się</btn>
        <p className='nonAuth__content__sidebar__p'>lub</p>
        <btn className='btn btn--wide'>Zarejestruj się</btn>
      </div>
    </section>
  );
};
export default ExploreContent;
