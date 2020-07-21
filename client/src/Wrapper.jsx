import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import English from './languages/en.json';
import Polish from './languages/pl.json';

export const Context = React.createContext();
let local = localStorage.getItem('lang') || 'pl';

let lang;
if (local === 'en') lang = English;
else lang = Polish;

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messanges, setMessenges] = useState(lang);

  function selectEn(e) {
    localStorage.setItem('lang', 'en');
    setLocale('en');
    setMessenges(English);
  }
  function selectPl(e) {
    localStorage.setItem('lang', 'pl');
    setLocale('pl');
    setMessenges(Polish);
  }

  return (
    <Context.Provider value={{ selectEn, selectPl }}>
      <IntlProvider messages={messanges} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
