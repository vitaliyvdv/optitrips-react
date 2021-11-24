import { useState, useEffect } from "react";
import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ListRadioButton from "js/components/foundation/ListRadioButton";

import workerCountries from "js/webworkers/countries.worker.js";
import workerMarket from "js/webworkers/market.worker.js";

const worker_Countries = new workerCountries();
const worker_Market = new workerMarket();

const AppCountry = props => {
  const {
    className,
    country,
    countryIsOpen,
    countriesList,
    locale,
    stateDialogCountry,
    setCountry,
    setCurrency,
    setLocale
  } = props;
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    worker_Countries.onmessage = async function (e) {
      await props.setCountriesList(e.data);
    };
    worker_Countries.postMessage(locale);
  }, [locale]);

  useEffect(() => {
    worker_Market.onmessage = e => {
      setCurrency(e.data.currency);
      setLocale(e.data.locale);
    };
    worker_Market.postMessage(country);
  }, [country]);

  const countryState = () => {
    stateDialogCountry(false);
    setCountryCode("");
  };

  const selectCountry = e => {
    setCountryCode(e.target.value);
  };

  const changeCountry = () => {
    if (countryCode !== "") {
      setCountry(countryCode);
    }
    countryState();
  };

  let currentCountry;
  if (countryCode === "") {
    currentCountry = country;
  } else {
    currentCountry = countryCode;
  }

  return (
    <Dialog
      active={countryIsOpen}
      className={classNames("settings", className)}
      title='Country'
      dialogClass=''
      closeDialog={countryState}
      dialogAction={<Button link uppercase value='Save' onClick={changeCountry} />}
    >
      <div className='buttons-list'>
        {countryIsOpen &&
          [...countriesList]
            .sort((a, b) => (a.Name.localeCompare(b.Name) < b.Name.localeCompare(a.Name) ? -1 : 1))
            .map((item, index) => (
              <ListRadioButton
                key={index.toString()}
                className={classNames({ active: item.Code === currentCountry })}
                value={item.Code}
                name='country'
                label={item.Name}
                checked={item.Code === currentCountry}
                onChange={selectCountry}
              />
            ))}
      </div>
    </Dialog>
  );
};

export default connect(
  state => ({
    country: state.Market.market.country,
    locale: state.Market.market.locale,
    countriesList: state.AppCountries.countries,
    countryIsOpen: state.AppSettings.settings.countryIsOpen
  }),
  dispatch => ({
    stateDialogCountry: boolean => {
      dispatch({ type: "COUNTRY_SETTINGS_STATE", countryIsOpen: boolean });
    },
    setCountry: value => {
      dispatch({ type: "MARKET_COUNTRY", country: value });
    },
    setCountriesList: data => {
      dispatch({ type: "COUNTRIES_LIST", countries: data });
    },
    setCurrency: value => {
      dispatch({ type: "MARKET_CURRENCY", currency: value });
    },
    setLocale: value => {
      dispatch({ type: "MARKET_LOCALE", locale: value });
    }
  })
)(AppCountry);
