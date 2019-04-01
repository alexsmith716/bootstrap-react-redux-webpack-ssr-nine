import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.info, action) => {
  switch (action.type) {
    case types.INFO:
      return action.info;
    default:
      return state;
  }
};

// store configuration