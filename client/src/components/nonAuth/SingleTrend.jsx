import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowDown, SadFace } from '../../img/Svgs.jsx';

const SingleTrend = ({ name, num, id = 1 }) => {
  const [report, setReport] = useState({
    checked: false,
    option: '',
  });

  const onChange = () => {
    setReport({
      ...report,
      checked: true,
    });
  };
  const onReportOptionChoosed = (e) => {
    e.preventDefault();
    setReport({
      checked: false,
      option: e.target.value,
    });
  };

  const Trend = (
    <div className='nonAuth__content__explore__trend'>
      <p to='/' className='nonAuth__content__explore__trend__p'>
        Najpopularniejsze w Polska
      </p>
      <Link
        to='/'
        className='heading-3 nonAuth__content__explore__trend__heading'
      >
        {name}
      </Link>
      <p className='nonAuth__content__explore__trend__p'>Tweety: {num} tys.</p>
      <div className='nonAuth__content__explore__trend__report'>
        <input
          type='checkbox'
          id={id}
          className='nonAuth__content__explore__trend__report__checkbox'
          value={report}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className='nonAuth__content__explore__trend__report__input'
        >
          {!report.checked ? (
            <ArrowDown className='nonAuth__content__explore__trend__report__input__icon' />
          ) : (
            <div className='nonAuth__content__explore__trend__report__box'>
              <button
                onClick={(e) => onReportOptionChoosed(e)}
                value='spam'
                className='nonAuth__content__explore__trend__report__box__btn'
              >
                <SadFace /> To jest spam
              </button>
              <button
                onClick={(e) => onReportOptionChoosed(e)}
                className='nonAuth__content__explore__trend__report__box__btn'
                value='insulting'
              >
                <SadFace /> Te treści są obraźliwe lub stanowią nadużycie
              </button>
              <button
                onClick={(e) => onReportOptionChoosed(e)}
                value='plagiarism'
                className='nonAuth__content__explore__trend__report__box__btn'
              >
                <SadFace /> Te treści są skopiowane z innego źródła
              </button>
              <button
                onClick={(e) => onReportOptionChoosed(e)}
                value='lowQuality'
                className='nonAuth__content__explore__trend__report__box__btn'
              >
                <SadFace /> To są treści niskiej jakości
              </button>
            </div>
          )}
        </label>
      </div>
    </div>
  );
  const ReportedTrend = (
    <div className='nonAuth__content__explore__trend'>
      <div className='nonAuth__content__explore__trend__report__field'>
        <p className='nonAuth__content__explore__trend__p--reported'>
          Dziekujemy. Odśwież tę stronę, aby zaktualizować trendy.
        </p>
      </div>
    </div>
  );

  return !report.option ? Trend : ReportedTrend;
};

export default SingleTrend;
