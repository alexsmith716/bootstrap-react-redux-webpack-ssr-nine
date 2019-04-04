import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxBatch } from '@manaflair/redux-batch';
import rootReducer from '../reducers/index';

// ----------------------------------------------------------------------

const middleware = [thunk];

function combine(reducers) {
  return combineReducers(reducers);
};

// ----------------------------------------------------------------------

const configureStore = ({history, preloadedState}) => {

  console.log('>>>>>>>>>>>>>>>>> configureStore > preloadedState:', preloadedState);

  // ----------------------------------------------------------------------

  // logger must be the last middleware in chain
  // collapsed: (takes a Boolean or optionally a Function that receives 'getState' 
  //             function for accessing current store state and 'action' object as parameters. 
  //             Returns 'true' if the log group should be collapsed, 'false' otherwise.)
  if (__CLIENT__ && __DEVELOPMENT__) {
    const logger = require('redux-logger').createLogger({collapsed: true}); // custom options
    middleware.push(logger);
  }

  const enhancers = [applyMiddleware(...middleware)];

  // ----------------------------------------------------------------------

  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../../containers/DevTools/DevTools').default;

    Array.prototype.push.apply(enhancers, [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]);
  }

  const finalEnhancer = compose(...enhancers);

  // ----------------------------------------------------------------------

  const store = createStore(
    combine(rootReducer(history)),
    preloadedState,
    // reduxBatch,
    finalEnhancer
  )

  // ----------------------------------------------------------------------

  if (__DEVELOPMENT__ && module.hot) {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > MODULE.HOT! <<<<<<<<<<<<<<<<<');
    module.hot.accept('../reducers/index', () => {
      let reducer = require('../reducers/index').default;
      reducer = combine(reducer(history));
      store.replaceReducer(reducer);
    });
  } else {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > NO MODULE.HOT! <<<<<<<<<<<<<<');
  }

  // ----------------------------------------------------------------------

  return store;
};

export default configureStore;
