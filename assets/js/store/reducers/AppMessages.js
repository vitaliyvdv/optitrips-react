const initialState = {
  messages: {
    messagesList: [],
    isActive: false
  }
};

const AppMessages = (state = initialState, action) => {
  switch (action.type) {
    case "APP_SNACKBAR":
      return { ...state, messages: { ...state.messages, isActive: action.snackbar } };

    case "CLEAR_APP_MESSAGES_LIST":
      return { ...state, messages: { ...state.messages, messagesList: [] } };

    default:
      return state;
  }
};

export default AppMessages;
