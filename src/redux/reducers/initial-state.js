import { List } from 'immutable';

export default {

  device: {
    isMobile: null
  },

  counter: {
    counter: null
  },

  auth: {
    loaded: false,
    user: null
  },

  notifs: {
    text: '',
    type: '',
  },

  info: {
    loaded: false
  },

  internet: {
    connected: false
  },

  online: (v = true) => v,

  objectTestOne: {
    text: '',
    type: '',
  },

  listTestOne: new List(),

};

// https://redux.js.org/recipes/structuring-reducers/initializing-state
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape

// INITIALIZING STATE:
// ==========================================

// Without 'combineReducers()' or similar manual code, 'preloadedState' always wins over 'state = ...' in the reducer 
//   because the state passed to the reducer is 'preloadedState' and is not 'undefined', so the ES6 argument syntax doesn't apply.
// 
// With 'combineReducers()' the behavior is more nuanced. 
// Those reducers whose state is specified in 'preloadedState' will receive that state. 
// Other reducers will receive 'undefined' and because of that will fall back to the 'state = ...' default argument they specify.
// 
// In general, 'preloadedState' wins over the state specified by the reducer. 
// This lets reducers specify initial data that makes sense to them as default arguments, 
//   but also allows loading existing data (fully or partially) when you're hydrating the store from some persistent storage or the server.
// 
// Note: Reducers whose initial state is populated using 'preloadedState' will still need to provide a default value to handle when passed a state of 'undefined'. 
// All reducers are passed undefined on initialization, so they should be written such that when given undefined, some value should be returned. 
// This can be any non-undefined value; there's no need to duplicate the section of 'preloadedState' here as the default.

