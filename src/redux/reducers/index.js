import { connectRouter } from 'connected-react-router';
import multireducer from 'multireducer';

import device from '../modules/device';
import counter from '../modules/counter';
import auth from '../modules/auth';
import notifs from '../modules/notifs';
import info from '../modules/info';
import online from '../modules/online';
import objectTestOne from '../modules/objectTestOne';
import listTestOne from '../modules/listTestOne';

export { default as initialState } from './initial-state';

export default function rootReducer(history) {
  return {
    router: connectRouter(history),
    device,
    counter,
    auth,
    notifs,
    info,
    online,
    objectTestOne,
    listTestOne
  };
}
