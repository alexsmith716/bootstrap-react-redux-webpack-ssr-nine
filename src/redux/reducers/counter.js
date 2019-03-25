const initialState = {
  counter: {
    counter: null
  },
};

import types from '../actions/action-types';


export default (state = initialState.counter, action) => {
  switch (action.type) {
    case types.COUNTER:
      return action.counter;
    default:
      return state;
  }
};
