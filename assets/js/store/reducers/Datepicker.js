const initialState = {
  datepicker: {
    lang: "en-GB",
    dateFormat: "yyyy-MM-dd"
  }
};

const Datepicker = (state = initialState, action) => {
  switch (action.type) {
    case "DATEPICKER":
      return { ...state, datepicker: { ...state.datepicker, lang: action.lang, dateFormat: action.dateFormat } };

    default:
      return state;
  }
};

export default Datepicker;
