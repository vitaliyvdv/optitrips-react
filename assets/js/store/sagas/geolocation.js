import { call, put, takeEvery, delay } from "redux-saga/effects";

export function* watchGeolocation() {
  yield takeEvery("GEOLOCATION", setGeolocation);
}

const getUserIP = () => {
  return axios({
    method: "get",
    url: "https://api.ipify.org",
    params: {
      format: "json",
      callback: "?"
    },
    timeout: 2000
  });
};

const GeoLocation = ipAdress => {
  return axios({
    method: "get",
    url: "https://apility-io-ip-geolocation-v1.p.rapidapi.com/" + ipAdress,
    headers: {
      "x-rapidapi-host": "apility-io-ip-geolocation-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      accept: "application/json"
    }
  });
};

const CurrentPlace = (country, currency, locale, userId) => {
  return axios({
    method: "get",
    url:
      "https://" +
      process.env.API_RAPIDAPI_URL +
      "/apiservices/autosuggest/v1.0/" +
      country +
      "/" +
      currency +
      "/" +
      locale +
      "/",
    headers: {
      "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      Accept: "application/json"
    },
    params: {
      id: userId + "-ip"
    }
  });
};

function* setGeolocation(action) {
  try {
    if (window.location.hostname.includes(process.env.APP_HOSTNAME)) {
      yield put({ type: "START_SCREEN_STATE", startScreen: true });
      const userid = yield call(getUserIP);
      const geolocation = yield call(GeoLocation, userid.data.ip);
      const country = geolocation.data.ip.country;
      if (country === "GB") {
        yield put({ type: "MARKET_COUNTRY", country: "UK" });
      } else {
        yield put({ type: "MARKET_COUNTRY", country: country });
      }
      yield put({ type: "MARKET_COUNTRY", country: country });
      const current = yield call(CurrentPlace, country, action.currency, action.locale, userid.data.ip);
      yield put({ type: "ORIGIN_PLACE_CURRENT", current: current.data.Places[0].PlaceId });
      yield put({
        type: "ORIGIN_PLACE_FULL_NAME",
        fullName: String(current.data.Places[0].PlaceName + " " + "(" + current.data.Places[0].CountryName + ")")
      });
      yield delay(500);
      yield put({ type: "START_SCREEN_STATE", startScreen: false });
    } else {
      yield put({ type: "START_SCREEN_STATE", startScreen: false });
    }
  } catch (error) {
    yield put({ type: "START_SCREEN_STATE", startScreen: false });
    console.log("Geolocation: " + error);
  }
}
