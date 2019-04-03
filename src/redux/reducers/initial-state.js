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

  online: {
    connected: false
  },

  objectTestOne: {
    text: '',
    type: '',
  },

  listTestOne: new List(),

};
