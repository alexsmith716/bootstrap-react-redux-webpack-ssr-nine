import { connectRouter } from 'connected-react-router';
import multireducer from 'multireducer';

import device from './modules/device';
import counter from './modules/counter';
import temperatureCalculator from './modules/temperatureCalculator';
// import auth from './modules/auth';
// import notifs from './modules/notifs';
// import info from './modules/info';
// import online from './modules/online';

export { default as initialState } from './initial-state';

// state shape
export default function rootReducer(history) {
  return {
    router: connectRouter(history),
    counter,
    device,
    counterCollection2: multireducer({
      // preloaded: counter,
      AboutOneMultireducer1: counter,
      AboutTwoMultireducer1: counter,
      AboutTwoMultireducer2: counter,
      AboutTwoMultireducer3: counter,
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
  };
}
