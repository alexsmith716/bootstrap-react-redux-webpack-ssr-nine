import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.device, action) => {
  switch (action.type) {
    case types.DEVICE:
      return action.device;
    default:
      return state;
  }
};

// store configuration