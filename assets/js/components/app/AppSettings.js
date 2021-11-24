import { useState, useEffect } from "react";
import Button from "js/components/foundation/Button";
import LocaleList from "data/locales.json";

import workerCountryLabel from "js/webworkers/countryLabel.worker.js";
import workerCurrencyLabel from "js/webworkers/currencyLabel.worker.js";
import workerLangLabel from "js/webworkers/langLabel.worker.js";
import workerDatepicker from "js/webworkers/datepicker.worker.js";

import("js/components/foundation/DatepickerLocale");

const AppSettings = props => {
  const {
    className,
    breakpoint,
    countryLabel,
    mobileMenu,
    stateDialogLang,
    stateDialogCountry,
    stateDialogCurrency,
    stateMobileMenu,
    country,
    locale,
    currency,
    currenciesList,
    countriesList,
    setGeolocation,
    setDatepicker
  } = props;

  const worker_CountryLabel = new workerCountryLabel();
  const worker_CurrencyLabel = new workerCurrencyLabel();
  const worker_LangLabel = new workerLangLabel();
  const worker_Datepicker = new workerDatepicker();

  const [CountryLabel, setCountryLabel] = useState("");
  const [LangLabel, setLangLabel] = useState("");
  const [CurrencyLabel, setCurrencyLabel] = useState("");

  useEffect(() => {
    (() => {
      worker_CountryLabel.onmessage = e => {
        setCountryLabel(e.data);
      };
      worker_CountryLabel.postMessage({ country, countriesList });
    })();

    (() => {
      worker_CurrencyLabel.onmessage = e => {
        setCurrencyLabel(e.data);
      };
      worker_CurrencyLabel.postMessage({ currency, currenciesList });
    })();

    (() => {
      worker_LangLabel.onmessage = e => {
        setLangLabel(e.data);
      };
      worker_LangLabel.postMessage({ locale, LocaleList });
    })();
  });

  useEffect(() => {
    setGeolocation(currency, locale);
  }, []);

  useEffect(() => {
    worker_Datepicker.onmessage = e => {
      setDatepicker(e.data.lang, e.data.dateFormat);
    };
    worker_Datepicker.postMessage({ country, locale });
  }, [locale, country]);

  const openDialogLang = () => {
    stateDialogLang(true);
  };

  const openDialogCountry = () => {
    stateDialogCountry(true);
  };

  const openDialogCurrency = () => {
    stateDialogCurrency(true);
  };

  const closeMobileMenu = () => {
    stateMobileMenu(false);
  };

  return (
    <div className={classNames("app-settings", className)}>
      {(breakpoint.xl || breakpoint.lg || breakpoint.md) && (
        <div className='app-settings--list d-flex align-items-center'>
          <Button
            uppercase
            outline
            color='silver'
            size='sm'
            className='btn-header ml-2'
            type='button'
            value={LangLabel}
            icon='language'
            iconclassName='md-dark md-18'
            onClick={openDialogLang}
          />
          <Button
            uppercase
            outline
            color='silver'
            size='sm'
            className='btn-header ml-2'
            type='button'
            value={CountryLabel}
            icon='place'
            iconclassName='md-dark md-18'
            onClick={openDialogCountry}
          />
          <Button
            uppercase
            outline
            color='silver'
            size='sm'
            className='btn-header ml-2'
            type='button'
            value={CurrencyLabel}
            onClick={openDialogCurrency}
          />
        </div>
      )}

      {(breakpoint.xs || breakpoint.sm) && (
        <ul className='menu list-unstyled d-flex flex-wrap py-2 my-0'>
          <li
            className='menu-item mx-2 mr-md-6'
            onClick={e => {
              e.stopPropagation();
              openDialogLang();
              closeMobileMenu();
            }}
          >
            <button type='button' className='menu-item--link d-flex align-items-center px-2 w-100'>
              <i className='material-icons md-dark mr-6 flex-shrink-0'>language</i>
              <div className='menu-item--title'>{LangLabel}</div>
            </button>
          </li>
          <li
            className='menu-item mx-2 mr-md-6'
            onClick={e => {
              e.stopPropagation();
              openDialogCountry();
              closeMobileMenu();
            }}
          >
            <button type='button' className='menu-item--link d-flex align-items-center px-2 w-100'>
              <i className='material-icons md-dark mr-6 flex-shrink-0'>public</i>
              <div className='menu-item--title'>{CountryLabel}</div>
            </button>
          </li>
          <li
            className='menu-item mx-2 mr-md-6'
            onClick={e => {
              openDialogCurrency();
              closeMobileMenu();
            }}
          >
            <button type='button' className='menu-item--link d-flex align-items-center px-2 w-100'>
              <i className='material-icons md-dark mr-6 flex-shrink-0'>monetization_on</i>
              <div className='menu-item--title'>{CurrencyLabel}</div>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default connect(
  state => ({
    breakpoint: state.Breakpoints.current,
    mobileMenu: state.AppSettings.settings.mobileMenuIsOpen,
    locale: state.Market.market.locale,
    country: state.Market.market.country,
    currency: state.Market.market.currency,
    currenciesList: state.AppCurrencies.currencies,
    countriesList: state.AppCountries.countries
  }),
  dispatch => ({
    stateMobileMenu: boolean => {
      dispatch({ type: "MOBILE_MENU_STATE", mobileMenu: boolean });
    },
    stateDialogLang: boolean => {
      dispatch({ type: "LANG_SETTINGS_STATE", langIsOpen: boolean });
    },
    stateDialogCountry: boolean => {
      dispatch({ type: "COUNTRY_SETTINGS_STATE", countryIsOpen: boolean });
    },
    stateDialogCurrency: boolean => {
      dispatch({ type: "CURRENCY_SETTINGS_STATE", currencyIsOpen: boolean });
    },
    setGeolocation: (currency, locale) => {
      dispatch({ type: "GEOLOCATION", currency: currency, locale: locale });
    },
    setDatepicker: (lang, dateFormat) => {
      dispatch({ type: "DATEPICKER", lang: lang, dateFormat: dateFormat });
    }
  })
)(AppSettings);
