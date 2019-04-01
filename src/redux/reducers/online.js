import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.online, action) => {
  switch (action.type) {
    case types.ONLINE:
      return action.online;
    default:
      return state;
  }
};

// store configuration