import { useState, useEffect } from "react";

const AppSnackbar = props => {
  const { messages, isActive, stateAppSnackbar, clearAppMessagesList } = props;

  useEffect(() => {
    if (messages.length > 0) {
      stateAppSnackbar(true);
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      toggleSnackbar(false);
    }, 7000);
  }, [isActive]);

  const toggleSnackbar = async boolean => {
    await stateAppSnackbar(boolean);
    setTimeout(() => {
      clearAppMessagesList();
    }, 500);
  };

  return (
    <div className='snackbar position-fixed w-100 mb-5'>
      <div className='container-fluid d-flex justify-content-center'>
        <div
          className={classNames("snackbar-surface d-flex align-items-center justify-content-between pr-2", {
            active: isActive
          })}
        >
          <div className='snackbar-labels px-4 py-3'>
            {messages.map((item, index) => (
              <div className='snackbar-labels--item' key={index.toString()}>
                {item}
              </div>
            ))}
          </div>
          <div className='snackbar-actions d-flex align-items-center'>
            <button
              type='button'
              className='btn btn-sm snackbar-close justify-content-center p-0 flex-shrink-0'
              onClick={() => toggleSnackbar(false)}
            >
              <i className='material-icons md-18'>close</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    messages: state.AppMessages.messages.messagesList,
    isActive: state.AppMessages.messages.isActive
  }),
  dispatch => ({
    stateAppSnackbar: boolean => {
      dispatch({ type: "APP_SNACKBAR", snackbar: boolean });
    },
    clearAppMessagesList: () => {
      dispatch({ type: "CLEAR_APP_MESSAGES_LIST" });
    }
  })
)(AppSnackbar);
