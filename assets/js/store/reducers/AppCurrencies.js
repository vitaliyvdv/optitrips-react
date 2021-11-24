const initialState = {
  currencies: []
};

const AppCurrencies = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENCIES_LIST":
      return { ...state, currencies: action.currenciesList };
    default:
      return state;
  }
};

export default AppCurrencies;
