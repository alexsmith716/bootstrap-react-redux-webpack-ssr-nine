const INCREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/INCREMENT_COUNTER_PRELOADED_STATE';
const DECREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/DECREMENT_COUNTER_PRELOADED_STATE';

const INCREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/INCREMENT_COUNTER_MULTIREDUCER';
const DECREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/DECREMENT_COUNTER_MULTIREDUCER';

import initialState from '../initial-state';

// counter: {
//   countPreloadedState: null,
//   countMultireducer: 0
// },

export default function reducer(state = initialState.counter, action = {}) {

  const { countPreloadedState } = state;
  const { countMultireducer } = state;

  switch (action.type) {

    case INCREMENT_COUNTER_PRELOADED_STATE:
      return {
        // ...state,
        countPreloadedState: countPreloadedState + 1
      };

    case DECREMENT_COUNTER_PRELOADED_STATE:
      return {
        // ...state,
        countPreloadedState: countPreloadedState - 1
      };

    case INCREMENT_COUNTER_MULTIREDUCER: {
      return {
        ...state,
        countMultireducer: countMultireducer + 1
      };
    }

    case DECREMENT_COUNTER_MULTIREDUCER:
      return {
        ...state,
        countMultireducer: countMultireducer - 1
      };

    default:
      return state;
  }
}

export function incrementPreloadedState() {
  return {
    type: INCREMENT_COUNTER_PRELOADED_STATE
  };
}

export function decrementPreloadedState() {
  return {
    type: DECREMENT_COUNTER_PRELOADED_STATE
  };
}

export function incrementMultireducer() {
  return {
    type: INCREMENT_COUNTER_MULTIREDUCER
  };
}

export function decrementMultireducer() {
  return {
    type: DECREMENT_COUNTER_MULTIREDUCER
  };
}
