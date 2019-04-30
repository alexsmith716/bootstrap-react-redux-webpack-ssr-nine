import { connectRouter } from 'connected-react-router';
import multireducer from 'multireducer';

import device from './modules/device';
import counter from './modules/counter';
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
    device,
    counter,
    // counterCollection: multireducer({
    //   AboutOne1: counter,
    //   AboutOne2: counter,
    //   AboutTwo1: counter,
    //   AboutTwo2: counter,
    // }),
    temperatureCalculatorCollection: multireducer({
      AboutOne1: temperatureCalculator,
      AboutOne2: temperatureCalculator,
      AboutTwo1: temperatureCalculator,
      AboutTwo2: temperatureCalculator,
    }),
    // temperatureCalculator: multireducer({
    //   temperatureCalculator1: temperatureCalculator,
    //   temperatureCalculator2: temperatureCalculator,
    // }),
    // // auth,
    // notifs,
    // info,
    // online,
    // objectTestOne,
    // listTestOne
  };
}
