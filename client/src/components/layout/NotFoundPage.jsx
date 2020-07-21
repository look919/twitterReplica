import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';

const NotFoundPage = () => {
  return (
    <section className="notFound">
      <Link to="/">
        <img src={Logo} alt="logo" className="notFound__logo" />
      </Link>
      <div className="notFound__info">
        <h2 className="heading-2 notFound__info__header">
          <FormattedMessage
            id="NotFoundPage.header"
            defaultMessage="404 Strona nie znaleziona"
          />
        </h2>
        <p>
          <FormattedMessage
            id="NotFoundPage.paragraph"
            defaultMessage="strona której szukasz nie istnieje lub jest uszkodzona "
          />
          <Link to="/" className="notFound__info__link">
            <FormattedMessage
              id="NotFoundPage.link"
              defaultMessage="wróc do strony głównej"
            />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
