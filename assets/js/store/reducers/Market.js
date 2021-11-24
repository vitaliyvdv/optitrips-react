const initialState = {
  market: {
    country: process.env.DEFAULT_COUNTRY,
    locale: process.env.DEFAULT_LOCALE,
    currency: process.env.DEFAULT_CURRENCY
  }
};

const Market = (state = initialState, action) => {
  switch (action.type) {
    case "MARKET_COUNTRY":
      return { ...state, market: { ...state.market, country: action.country } };

    case "MARKET_LOCALE":
      return { ...state, market: { ...state.market, locale: action.locale } };

    case "MARKET_CURRENCY":
      return { ...state, market: { ...state.market, currency: action.currency } };

    default:
      return state;
  }
};

export default Market;
