import initialState from './initial-state';
import types from '../actions/action-types';


export default (state = initialState.notifs, action) => {
  switch (action.type) {
    case types.NOTIFS:
      return action.notifs;
    default:
      return state;
  }
};

// store configuration