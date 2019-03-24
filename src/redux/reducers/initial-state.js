import { List } from 'immutable';

export default req => ({

  device: {
    isMobile: req.isMobile
  },

  randomInteger: {
    randomInteger: req.randomInteger
  },

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

  initialStateObjTestOne: {
    text: '',
    type: '',
  },

  initialStateListTest: new List(),

});

// ===========================================================
// import multireducer from 'multireducer';
// import { routerReducer } from 'react-router-redux';
// import auth from './modules/auth';
// import notifs from './modules/notifs';
// import counter from './modules/counter';
// import info from './modules/info';
// 
// export default function createReducers(asyncReducers) {
//   return {
//     router: routerReducer,
//     online: (v = true) => v,
//     notifs,
//     auth,
//     counter: multireducer({
//       counter1: counter,
//       counter2: counter,
//       counter3: counter
//     }),
//     info,
//     ...asyncReducers
//   };
// }
