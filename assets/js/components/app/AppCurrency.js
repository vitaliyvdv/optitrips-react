import { useState, useEffect } from "react";
import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ListRadioButton from "js/components/foundation/ListRadioButton";

import workerCurrencies from "js/webworkers/currenciesList.worker.js";
const worker_Currencies = new workerCurrencies();

const AppCurrency = props => {
  const { className, currency, currenciesList, currencyIsOpen, stateDialogCurrency, setCurrency } = props;
  const [currencyCode, setCurrencyCode] = useState("");

  useEffect(() => {
    worker_Currencies.onmessage = async function (e) {
      await props.setCurrenciesList(e.data);
    };
    worker_Currencies.postMessage("");
  }, []);

  const currencyState = () => {
    stateDialogCurrency(false);
    setCurrencyCode("");
  };

  const selectCurrency = e => {
    setCurrencyCode(e.target.value);
  };

  const changeCurrency = () => {
    if (currencyCode !== "") {
      setCurrency(currencyCode);
    }
    currencyState();
  };

  let currentCurrency;
  if (currencyCode === "") {
    currentCurrency = currency;
  } else {
    currentCurrency = currencyCode;
  }

  return (
    <Dialog
      active={currencyIsOpen}
      className={classNames("settings", className)}
      title='Currency'
      dialogClass=''
      closeDialog={currencyState}
      dialogAction={<Button link uppercase value='Save' onClick={changeCurrency} />}
    >
      <div className='buttons-list'>
        {currencyIsOpen &&
          [...currenciesList]
            .sort((a, b) => (a.Code < b.Code ? -1 : 1))
            .map((item, index) => (
              <ListRadioButton
                key={index.toString()}
                className={classNames({ active: item.Code === currentCurrency })}
                value={item.Code}
                name='currency'
                label={item.Code + " - " + item.Symbol}
                checked={item.Code === currentCurrency}
                onChange={selectCurrency}
              />
            ))}
      </div>
    </Dialog>
  );
};

export default connect(
  state => ({
    currency: state.Market.market.currency,
    currenciesList: state.AppCurrencies.currencies,
    currencyIsOpen: state.AppSettings.settings.currencyIsOpen
  }),
  dispatch => ({
    stateDialogCurrency: boolean => {
      dispatch({ type: "CURRENCY_SETTINGS_STATE", currencyIsOpen: boolean });
    },
    setCurrency: value => {
      dispatch({ type: "MARKET_CURRENCY", currency: value });
    },
    setCurrenciesList: data => {
      dispatch({ type: "CURRENCIES_LIST", currenciesList: data });
    }
  })
)(AppCurrency);
