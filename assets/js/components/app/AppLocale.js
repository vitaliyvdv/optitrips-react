import { useState, useEffect } from "react";
import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ListRadioButton from "js/components/foundation/ListRadioButton";
import LocaleList from "data/locales.json";

const AppLocale = props => {
  const { className, langIsOpen, locale, stateDialogLang, setLocale } = props;
  const [localeCode, setLocaleCode] = useState("");

  const localeState = () => {
    stateDialogLang(false);
    setLocaleCode("");
  };

  const changeLocale = () => {
    if (localeCode !== "") {
      setLocale(localeCode);
    }
    localeState();
  };

  const selectLocale = e => {
    setLocaleCode(e.target.value);
  };

  let currentLocale;
  if (localeCode === "") {
    currentLocale = locale;
  } else {
    currentLocale = localeCode;
  }

  return (
    <Dialog
      active={langIsOpen}
      className={classNames("settings", className)}
      title='Language'
      dialogClass=''
      closeDialog={localeState}
      dialogAction={<Button link uppercase value='Save' onClick={changeLocale} />}
    >
      <div className='buttons-list'>
        {langIsOpen &&
          [...LocaleList]
            .sort((a, b) => (a.Name < b.Name ? -1 : 1))
            .map((item, index) => (
              <ListRadioButton
                key={index.toString()}
                className={classNames({ active: item.Code === currentLocale })}
                value={item.Code}
                name='country'
                label={item.Name}
                checked={item.Code === currentLocale}
                onChange={selectLocale}
              />
            ))}
      </div>
    </Dialog>
  );
};

export default connect(
  state => ({
    locale: state.Market.market.locale,
    langIsOpen: state.AppSettings.settings.langIsOpen
  }),
  dispatch => ({
    stateDialogLang: boolean => {
      dispatch({ type: "LANG_SETTINGS_STATE", langIsOpen: boolean });
    },
    setLocale: value => {
      dispatch({ type: "MARKET_LOCALE", locale: value });
    }
  })
)(AppLocale);
