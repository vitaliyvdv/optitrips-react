import "registerServiceWorker";
import storeApp from "js/store";
import createSagaMiddleware from "redux-saga";
import rootSaga from "js/store/sagas";
import App from "js/App";

// navigator.serviceWorker.getRegistrations().then(function(registrations) {
//   for (let registration of registrations) {
//     registration.unregister();
//   }
// });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(storeApp, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const renderIfExist = (Component, node) => {
  if (node) {
    ReactDOM.render(Component, node);
  }
};

renderIfExist(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
