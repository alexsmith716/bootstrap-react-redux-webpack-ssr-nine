import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.listTestOne, action) => {
  switch (action.type) {
    case types.LISTTESTONE:
      return action.listTestOne;
    default:
      return state;
  }
};
