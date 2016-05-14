import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './../reducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import { AsyncStorage } from 'react-native';

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
  //const store = autoRehydrate()(createAppStore)(rootReducer);
  //persistStore(store, {storage: AsyncStorage}, onComplete);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('./../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
