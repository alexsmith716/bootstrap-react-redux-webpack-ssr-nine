// Dependencies
import { combineReducers } from 'redux';

// App Reducers

// Shared Reducers
import device from './deviceReducer';

const rootReducer = combineReducers({
  // App Reducers,
  device
});

export default rootReducer;
