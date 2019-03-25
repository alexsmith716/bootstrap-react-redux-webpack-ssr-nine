import { List } from 'immutable';

export default {

  auth: {
    loaded: false,
    user: null
  },

  notifs: {},

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
