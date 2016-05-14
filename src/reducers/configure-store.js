import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './../reducers';

const logger = createLogger({
  collapsed:true,
  duration:true
});

const createAppStore = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore() {

  const store = createAppStore(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
