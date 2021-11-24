const initialState = {
  places: {
    list: [],
    firstMatch: ""
  }
};

const FlightsLivePlaces = (state = initialState, action) => {
  switch (action.type) {
    case "PLACES_LIST":
      return { ...state, places: { ...state.places, list: action.list, firstMatch: action.firstMatch } };
    case "PLACES_FIRST_MATCH":
      return { ...state, places: { ...state.places, firstMatch: action.firstMatch } };
    default:
      return state;
  }
};

export default FlightsLivePlaces;
