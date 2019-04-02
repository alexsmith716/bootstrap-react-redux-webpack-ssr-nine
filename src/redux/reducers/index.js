import { connectRouter } from 'connected-react-router';

import device from './device';
import counter from './counter';
import auth from './auth';
import notifs from './notifs';
import info from './info';
import internet from './internet';
// import online from './online';
import objectTestOne from './objectTestOne';
import listTestOne from './listTestOne';

export { default as initialState } from './initial-state';

export default function rootReducer(history) {
  return {
    router: connectRouter(history),
    device,
    counter,
    auth,
    notifs,
    info,
    internet,
    objectTestOne,
    listTestOne
  };
}

// store configuration

// https://redux.js.org/recipes/structuring-reducers/initializing-state
// https://redux.js.org/api/createstore#createstorereducer-preloadedstate-enhancer
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape

// createStore(reducer, [preloadedState], [enhancer])
// =================================================================================

// Creates a Redux store that holds the complete state tree of your app.
// There should only be a single store in your app.

// reducer (Function) ---------------------------------: 
//   A reducing function that returns the next state tree, given the current state tree and an action to handle.

// [preloadedState] (any) -----------------------------: 
//   The initial state. 
//   You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. 
//   If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. 
//   Otherwise, you are free to pass anything that your reducer can understand.

// [enhancer] (Function) ------------------------------: 
//   The store enhancer. 
//   You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. 
//   The only store enhancer that ships with Redux is applyMiddleware().


// createStore (Returns)
// =================================================================================

// (Store): An object that holds the complete state of your app. 
// The only way to change its state is by dispatching actions. 
// You may also subscribe to the changes to its state to update the UI.


// createStore (Tips)
// =================================================================================

// * Don't create more than one store in an application! 
//   Instead, use combineReducers to create a single root reducer out of many.

// * It is up to you to choose the state format. 
//   You can use plain objects or something like Immutable. 
//   If you're not sure, start with plain objects.

// * If your state is a plain object, make sure you never mutate it! 
//   For example, instead of returning something like Object.assign(state, newData) from your reducers, return Object.assign({}, state, newData). 
//   This way you don't override the previous state. 
//   You can also write return { ...state, ...newData } if you enable the object spread operator proposal.

// * For universal apps that run on the server, create a store instance with every request so that they are isolated. 
//   Dispatch a few data fetching actions to a store instance and wait for them to complete before rendering the app on the server.

// * When a store is created, Redux dispatches a dummy action to your reducer to populate the store with the initial state. 
//   You are not meant to handle the dummy action directly. 
//   Just remember that your reducer should return some kind of initial state if the state given to it as the first argument is undefined, and you're all set.

// * To apply multiple store enhancers, you may use compose().

