
import { createStore } from 'redux';
// import { autoRehydrate } from 'redux-persist';
// import thunk from 'redux-thunk';

import Reducers from './reducers';

let reduxStore = null;

const getReduxStore = (initialState = {}) => {
  if (!process.browser || !reduxStore) {
    // const universalMiddlewares = [thunk];

    // const middlewares = process.browser ? compose(
    //   autoRehydrate(),
    //   universalMiddlewares,
    // ) : universalMiddlewares;

    const newReduxStore = createStore(Reducers, initialState);
    if (!process.browser) {
      return newReduxStore;
    }

    reduxStore = newReduxStore;
  }

  return reduxStore;
};

export default getReduxStore;
