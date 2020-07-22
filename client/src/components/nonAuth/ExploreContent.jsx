import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../smallParts/Input';
import SideBarImg from '../../img/twitter_login_sidebar_illustration.png';

const ExploreContent = () => {
  return (
    <section className='nonAuth__content'>
      <div className='nonAuth__content__explore'>
        <div className='nonAuth__content__explore__heading'>
          <h2 className='heading-2'>Przeglądaj</h2>
        </div>
        <div className='nonAuth__content__explore__photo'>
          <p className='nonAuth__content__explore__photo__p'>COVID-19 · LIVE</p>
          <h1 className='heading-1 nonAuth__content__explore__photo__heading'>
            COVID-19: Updates for the US
          </h1>
        </div>
        <div className='nonAuth__content__explore__photo__breakline'>
          &nbsp;
        </div>
        <div className='nonAuth__content__explore__subheading'>
          <h2 className='heading-2'>Najpopularniejsze dla Ciebie</h2>
        </div>
      </div>

      <div className='nonAuth__content__sidebar'>
        <img
          src={SideBarImg}
          className='nonAuth__content__sidebar__img'
          alt='twitter recommendition'
        />
        <h2 className='heading-2 nonAuth__content__sidebar__heading'>
          Zobacz co się dzieje na świecie w tym momencie.
        </h2>
        <Input type='email' name='E-mail' />
        <Input type='password' name='Hasło' />
        <Link to='/' className='btn-inline'>
          Nie pamiętasz hasła?
        </Link>
        <button className='btn btn--dark btn--wide'>Zaloguj się</button>
        <p className='nonAuth__content__sidebar__p'>lub</p>
        <button className='btn btn--wide'>Zarejestruj się</button>
      </div>
    </section>
  );
};
export default ExploreContent;
