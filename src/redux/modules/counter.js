const INCREMENT_COUNTER = 'redux-example/counter/INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'redux-example/counter/DECREMENT_COUNTER';

import initialState from '../initial-state';

export default function reducer(state = initialState.counter, action) {

  switch (action.type) {

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
