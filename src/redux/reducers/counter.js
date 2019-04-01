import initialState from './initial-state';
import types from '../actions/action-types';


export default (state = initialState.counter, action) => {
  switch (action.type) {
    case types.COUNTER:
      return action.counter;
    default:
      return state;
  }
};

// store configuration