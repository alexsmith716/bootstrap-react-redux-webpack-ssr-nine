import { List } from 'immutable';

export default {

  device: {
    isMobile: req.isMobile
  },

  randomInteger: {
    randomInteger: req.randomInteger
  },

  initialStateListTest: new List(),
  
  internet: {
    connected: false,
  },

  initialStateObjTestOne: {
    text: '',
    type: '',
  },

  initialStateObjTestTwo: {
    text: '',
    type: '',
  },

};
