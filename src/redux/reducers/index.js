import { connectRouter } from 'connected-react-router';

import device from './device';
import counter from '../actions/counter';
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
