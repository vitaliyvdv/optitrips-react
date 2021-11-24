import { call, put, takeEvery, delay } from "redux-saga/effects";

export function* watchFlightsLiveFilter() {
  yield takeEvery("FILTER_RESULTS", flightsLiveFilter);
}

function* filterAPI(action) {
  try {
    const filter = yield axios({
      method: "get",
      url: "https://" + process.env.API_RAPIDAPI_URL + "/apiservices/pricing/uk2/v1.0/" + action.session,
      headers: {
        "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
        "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
        Accept: "application/json"
      },
      params: {
        sortType: action.sortType,
        sortOrder: action.sortOrder,
        duration: action.duration,
        includeCarriers: action.includeCarriers.join(";"),
        excludeCarriers: action.excludeCarriers.join(";"),
        stops: action.stops,
        outboundDepartTime: action.outboundDepartTime,
        outboundDepartStartTime: action.outboundDepartStartTime,
        outboundDepartEndTime: action.outboundDepartEndTime,
        inboundDepartTime: action.inboundDepartTime,
        inboundDepartStartTime: action.inboundDepartStartTime,
        inboundDepartEndTime: action.inboundDepartEndTime,
        pageIndex: action.pageIndex,
        pageSize: action.pageSize
      }
    });
    return filter;
  } catch (error) {
    yield delay(1000);
    const filter = yield call(filterAPI, action);
    return filter;
  }
}

function* flightsLiveFilter(action) {
  try {
    yield put({ type: "PRELOADER", preloader: true });
    const data = yield call(filterAPI, action);
    yield console.log(data);
    yield put({ type: "FLIGHTS_LIVE_RESULTS_DATA", data: data });
    yield put({ type: "PRELOADER", preloader: false });
  } catch (error) {
    console.log("Flights Live Filter: " + error);
    yield put({ type: "PRELOADER", preloader: false });
  }
}
