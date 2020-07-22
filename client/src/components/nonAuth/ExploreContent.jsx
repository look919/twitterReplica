import React from 'react';
import { Link } from 'react-router-dom';

import SingleTrend from './SingleTrend';
import SingleEvent from './SingleEvent';
import Input from '../smallParts/Input';
import SideBarImg from '../../img/twitter_login_sidebar_illustration.png';

import event1 from '../../img/events/event-1.jpg';
import event2 from '../../img/events/event-2.jpg';
import event3 from '../../img/events/event-3.jpg';
import event4 from '../../img/events/event-4.jpg';
import event5 from '../../img/events/event-5.jpg';
import event6 from '../../img/events/event-6.jpg';

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

        <div className='nonAuth__content__explore__trends'>
          <SingleTrend name='#sejm' num={73.2} />
          <SingleTrend name='Kanye' num={465} />
          <SingleTrend name='Polish' num={20.6} />
          <SingleTrend name='Lorem' num={10.4} />
          <SingleTrend name='#ipsum' num={42.7} />
          <Link
            to='/'
            className='btn-inline nonAuth__content__explore__trends__more'
          >
            Pokaż więcej
          </Link>
        </div>
        <div className='nonAuth__content__explore__photo__breakline'>
          &nbsp;
        </div>
        <div className='nonAuth__content__explore__heading'>
          <h2 className='heading-2'>Co się dzieje</h2>
        </div>
        <div className='nonAuth__content__explore__events'>
          <SingleEvent
            author='The Active Times'
            time='4 minuty temu'
            text='The most pet-friendly cities in America'
            img={event1}
          />
          <SingleEvent
            author='CNBC Make it'
            time='9 minut temu'
            text="MIT engineers designed a face mask that\'s as effective as an N95"
            img={event2}
          />
          <SingleEvent
            author='Los Angeles Times'
            time='2 godziny temu'
            text='Spotify to take on YouTube by offering video podcasts'
            img={event3}
          />
          <SingleEvent
            author='Toronto Star'
            time='wczoraj'
            text='Safe Third Country Agreement with U.S. violates charter: Federal court'
            img={event4}
          />
          <SingleEvent
            author='The Wall Street Journal'
            time='wczoraj'
            text='How deadly is Covid-19? Researchers are getting closer to an answer'
            img={event5}
          />
          <SingleEvent
            author='Los Angeles Times'
            time='July 20, 2020'
            text='This photo was taken at a Portland protest. Learn the story behind it:'
            img={event6}
          />
          <Link
            to='/'
            className='btn-inline nonAuth__content__explore__trends__more'
          >
            Pokaż więcej
          </Link>
          <div className='nonAuth__content__explore__photo__breakline'>
            &nbsp;
          </div>
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
