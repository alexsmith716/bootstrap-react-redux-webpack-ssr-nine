const INCREMENT_COUNTER = 'redux-example/counter/INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'redux-example/counter/DECREMENT_COUNTER';

import initialState from '../initial-state';

// counterPreloadedState: {
//   count: null
// },
// counterMultireducer: {
//   count: 0
// },

export default function reducer(state = initialState.counterPreloadedState, action = {}) {

  switch (action.type) {

    case INCREMENT_COUNTER: {
      const { count } = state;
      console.log('>>>>>>>>>>>>>>>>> MODULES > INCREMENT_COUNTER > count:', count);
      return {
        count: count + 1
      };
    }

    case DECREMENT_COUNTER: {
      const { count } = state;
      console.log('>>>>>>>>>>>>>>>>> MODULES > DECREMENT_COUNTER > count:', count);
      return {
        count: count - 1
      };
    }

    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}
