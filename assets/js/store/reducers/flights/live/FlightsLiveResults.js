const initialState = {
  data: null,
  sessionKey: ""
};

const FlightsLiveResults = (state = initialState, action) => {
  switch (action.type) {
    case "FLIGHTS_LIVE_RESULTS_SESSION_KEY":
      return { ...state, sessionKey: action.session };

    case "FLIGHTS_LIVE_RESULTS_DATA":
      return { ...state, data: action.data };

    default:
      return state;
  }
};

export default FlightsLiveResults;
