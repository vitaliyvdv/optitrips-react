const initialState = {
  countries: []
};

const AppCountries = (state = initialState, action) => {
  switch (action.type) {
    case "COUNTRIES_LIST":
      return { ...state, countries: action.countries };
    default:
      return state;
  }
};

export default AppCountries;
