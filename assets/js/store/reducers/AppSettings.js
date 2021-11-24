const initialState = {
  settings: {
    langIsOpen: false,
    countryIsOpen: false,
    currencyIsOpen: false,
    mobileMenuIsOpen: false,
    preloader: false,
    startScreen: true
  }
};

const AppSettings = (state = initialState, action) => {
  switch (action.type) {
    case "START_SCREEN_STATE":
      return { ...state, settings: { ...state.settings, startScreen: action.startScreen } };

    case "PRELOADER":
      return { ...state, settings: { ...state.settings, preloader: action.preloader } };

    case "MOBILE_MENU_STATE":
      return { ...state, settings: { ...state.settings, mobileMenuIsOpen: action.mobileMenu } };

    case "LANG_SETTINGS_STATE":
      return { ...state, settings: { ...state.settings, langIsOpen: action.langIsOpen } };

    case "COUNTRY_SETTINGS_STATE":
      return { ...state, settings: { ...state.settings, countryIsOpen: action.countryIsOpen } };

    case "CURRENCY_SETTINGS_STATE":
      return { ...state, settings: { ...state.settings, currencyIsOpen: action.currencyIsOpen } };

    default:
      return state;
  }
};

export default AppSettings;
