const INCREMENT_COUNTER = 'redux-example/counter/INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'redux-example/counter/DECREMENT_COUNTER';

import initialState from '../reducers/initial-state';

// specify the initial state
export default function reducer(state = initialState.counter, action) {

  // handle actions
  switch (action.type) {

    // don't mutate the state, return a created object "{counter: null}"
    case INCREMENT_COUNTER: {
      const { counter } = state;
      console.log('>>>>>>>>>>>>>>>>> MODULES > INCREMENT_COUNTER > counter:', counter);
      return {
        counter: counter + 1
      };
    }

    case DECREMENT_COUNTER: {
      const { counter } = state;
      console.log('>>>>>>>>>>>>>>>>> MODULES > DECREMENT_COUNTER > counter:', counter);
      return {
        counter: counter - 1
      };
    }

    // no matching action, just return the given state (default or not)
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
