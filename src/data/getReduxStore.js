
import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import Reducers from './reducers';

let reduxStore = null;

const getReduxStore = (initialState = {}) => {
  if (!process.browser || !reduxStore) {
    const universalMiddlewares = applyMiddleware(thunk);

    const middlewares = process.browser ? compose(
      autoRehydrate(),
      universalMiddlewares,
    ) : universalMiddlewares;

    const newReduxStore = createStore(Reducers, initialState, middlewares);
    if (!process.browser) {
      return newReduxStore;
    }

    reduxStore = newReduxStore;
  }

  return reduxStore;
};

export default getReduxStore;
