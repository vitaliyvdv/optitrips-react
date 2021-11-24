import Breakpoints from "js/store/reducers/Breakpoints";
import AppSettings from "js/store/reducers/AppSettings";
import AppMessages from "js/store/reducers/AppMessages";
import AppCurrencies from "js/store/reducers/AppCurrencies";
import AppCountries from "js/store/reducers/AppCountries";
import Market from "js/store/reducers/Market";
import Datepicker from "js/store/reducers/Datepicker";
import FlightsLiveSearch from "js/store/reducers/flights/live/FlightsLiveSearch";
import FlightsLivePlaces from "js/store/reducers/flights/live/FlightsLivePlaces";
import FlightsLiveResults from "js/store/reducers/flights/live/FlightsLiveResults";
import FlightsLiveFilter from "js/store/reducers/flights/live/FlightsLiveFilter";

const storeApp = combineReducers({
  Breakpoints,
  AppSettings,
  AppMessages,
  Market,
  Datepicker,
  AppCurrencies,
  AppCountries,
  FlightsLiveSearch,
  FlightsLivePlaces,
  FlightsLiveResults,
  FlightsLiveFilter
});

export default storeApp;
