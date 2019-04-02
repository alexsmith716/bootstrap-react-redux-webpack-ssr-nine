import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import { reduxBatch } from '@manaflair/redux-batch';

import rootReducer from '../reducers/index';

function combine(reducers) {
  return combineReducers(reducers);
};

const configureStore = ({history, preloadedState}) => {

  console.log('>>>>>>>>>>>>>>>>> configureStore > preloadedState:', preloadedState);

  const store = createStore(
    combine(rootReducer(history)),
    preloadedState,
    // reduxBatch,
    applyMiddleware(thunk)
  )

  if (__DEVELOPMENT__ && module.hot) {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > MODULE.HOT! <<<<<<<<<<<<<<<<<');
    module.hot.accept('../reducers/index', () => {
      let reducer = require('../reducers/index');
      reducer = combine(reducer(history));
      store.replaceReducer(reducer);
    });
  } else {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > NO MODULE.HOT! <<<<<<<<<<<<<<');
  }

  return store;
};

export default configureStore;

// store configuration
