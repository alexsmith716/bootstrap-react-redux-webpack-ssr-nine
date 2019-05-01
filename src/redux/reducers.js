import { connectRouter } from 'connected-react-router';
import multireducer from 'multireducer';

import devicePreloadedState from './modules/devicePreloadedState';
import counterPreloadedState from './modules/counterPreloadedState';
import counterMultireducer from './modules/counterMultireducer';
import temperatureCalculator from './modules/temperatureCalculator';
// import event from './modules/event/reducers';
// import auth from './modules/auth';
// import notifs from './modules/notifs';
// import info from './modules/info';
// import online from './modules/online';
// import objectTestOne from './modules/objectTestOne';
// import listTestOne from './modules/listTestOne';

export { default as initialState } from './initial-state';

// state shape
export default function rootReducer(history) {
  return {
    router: connectRouter(history),
    // event,
    devicePreloadedState,
    counterPreloadedState,
    counterCollection: multireducer({
      AboutTwo1: counterMultireducer,
      AboutTwo2: counterMultireducer,
    }),
    temperatureCalculatorCollection: multireducer({
      AboutOne1: temperatureCalculator,
      AboutOne2: temperatureCalculator,
      AboutTwo1: temperatureCalculator,
      AboutTwo2: temperatureCalculator,
    }),
    // // auth,
    // notifs,
    // info,
    // online,
    // objectTestOne,
    // listTestOne
  };
}
