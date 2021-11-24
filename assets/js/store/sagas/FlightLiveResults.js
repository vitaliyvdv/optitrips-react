import { call, put, takeEvery, delay } from "redux-saga/effects";

export function* watchFlightsLiveResults() {
  yield takeEvery("FLIGHTS_LIVE_RESULTS", flightsLiveResults);
}

const createSession = (
  country,
  currency,
  locale,
  originPlace,
  destinationPlace,
  outboundDate,
  inboundDate,
  cabinClass,
  adults,
  children,
  infants,
  includeCarriers,
  excludeCarriers,
  groupPricing
) => {
  return axios({
    method: "POST",
    url: "https://" + process.env.API_RAPIDAPI_URL + "/apiservices/pricing/v1.0",
    headers: {
      "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    data:
      "country=" +
      country +
      "&currency=" +
      currency +
      "&locale=" +
      locale +
      "&originPlace=" +
      originPlace +
      "&destinationPlace=" +
      destinationPlace +
      "&outboundDate=" +
      outboundDate +
      "&inboundDate=" +
      inboundDate +
      "&cabinClass=" +
      cabinClass +
      "&adults=" +
      String(adults) +
      "&children=" +
      String(children) +
      "&infants=" +
      String(infants) +
      "&includeCarriers=" +
      includeCarriers +
      "&excludeCarriers=" +
      excludeCarriers +
      "&groupPricing=" +
      groupPricing
  });
};

function* flightsLiveResultsAPI(session) {
  try {
    const result = yield axios({
      method: "get",
      url: "https://" + process.env.API_RAPIDAPI_URL + "/apiservices/pricing/uk2/v1.0/" + session,
      headers: {
        "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
        "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
        Accept: "application/json"
      },
      params: {
        pageIndex: 0,
        pageSize: 10
      }
    });
    if (result.data.Status != "UpdatesComplete") {
      yield delay(1000);
      const result = yield call(flightsLiveResultsAPI, session);
      return result;
    } else {
      return result;
    }
  } catch (error) {
    yield delay(1000);
    const result = yield call(flightsLiveResultsAPI, session);
    return result;
  }
}

function sessionId(value) {
  return value.substring(value.lastIndexOf("/") + 1);
}

function goToResultsPage(history) {
  history.push("/flights/results");
}

function* flightsLiveSession(action) {
  try {
    const session = yield call(
      createSession,
      action.country,
      action.currency,
      action.locale,
      action.originPlace,
      action.destinationPlace,
      action.outboundDate,
      action.inboundDate,
      action.cabinClass,
      action.adults,
      action.children,
      action.infants,
      action.includeCarriers,
      action.excludeCarriers,
      action.groupPricing
    );
    return session;
  } catch (error) {
    yield delay(1000);
    const session = yield call(flightsLiveSession, action);
    return session;
  }
}

function* flightsLiveResults(action) {
  try {
    yield put({ type: "PRELOADER", preloader: true });
    const data = yield call(flightsLiveSession, action);
    const sessionKey = yield call(sessionId, data.headers.location);
    yield put({ type: "FLIGHTS_LIVE_RESULTS_SESSION_KEY", session: sessionKey });
    const results = yield call(flightsLiveResultsAPI, sessionKey);
    yield console.log(results);
    yield put({ type: "FLIGHTS_LIVE_RESULTS_DATA", data: results });
    yield call(goToResultsPage, action.history);
    yield put({ type: "PRELOADER", preloader: false });
  } catch (error) {
    console.log("Flights Live Results: " + error);
    yield put({ type: "PRELOADER", preloader: false });
  }
}
