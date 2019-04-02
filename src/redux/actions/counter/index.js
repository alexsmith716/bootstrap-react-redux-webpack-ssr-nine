// import setCounter from './setCounter';
// import incrementCounter from './incrementCounter';
// import decrementCounter from './decrementCounter';
// 
// 
// export default {
//   setCounter,
//   incrementCounter,
//   decrementCounter,
// };

const SET_COUNTER = 'redux-example/counter/SET_COUNTER';
const INCREMENT_COUNTER = 'redux-example/counter/INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'redux-example/counter/DECREMENT_COUNTER';

import initialState from '../../reducers/initial-state';


export default function reducer(state = initialState.counter, action) {

  switch (action.type) {

    case INCREMENT_COUNTER: {
      const { counter } = state;
      console.log('>>>>>>>>>>>>>>>> MODULES.Counter > INCREMENT_COUNTER111: ', state);
      console.log('>>>>>>>>>>>>>>>> MODULES.Counter > INCREMENT_COUNTER222: ', counter);
      return {
        counter: counter + 1
      };
    }

    case DECREMENT_COUNTER: {
      const { counter } = state;
      console.log('>>>>>>>>>>>>>>>> MODULES.Counter > DECREMENT_COUNTER111: ', state);
      console.log('>>>>>>>>>>>>>>>> MODULES.Counter > DECREMENT_COUNTER222: ', counter);
      return {
        counter: counter - 1
      };
    }

    default:
      return state;
  }
}

export function increment() {
  console.log('>>>>>>>>>>>>>>>> MODULES.Counter > export function increment()');
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  console.log('>>>>>>>>>>>>>>>> MODULES.Counter > export function decrement()');
  return {
    type: DECREMENT_COUNTER
  };
}
