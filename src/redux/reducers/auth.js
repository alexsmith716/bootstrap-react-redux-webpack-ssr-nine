import initialState from './initial-state';

import types from '../actions/action-types';


export default (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH:
      return action.auth;
    default:
      return state;
  }
};
