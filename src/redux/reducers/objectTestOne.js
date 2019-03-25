import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.objectTestOne, action) => {
  switch (action.type) {
    case types.OBJECTTESTONE:
      return action.objectTestOne;
    default:
      return state;
  }
};
