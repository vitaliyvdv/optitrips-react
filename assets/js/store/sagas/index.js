import { all } from "redux-saga/effects";
import { watchGeolocation } from "js/store/sagas/geolocation";
import { watchFlightsLiveResults } from "js/store/sagas/FlightLiveResults";
import { watchFlightsLiveFilter } from "js/store/sagas/FlightLiveFilter";

export default function* rootSaga() {
  yield all([
    watchGeolocation(),
    watchFlightsLiveResults(),
    watchFlightsLiveFilter()
    // add other watchers to the array
  ]);
}
