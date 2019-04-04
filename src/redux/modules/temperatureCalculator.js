const CELSIUS_CHANGE = 'redux-example/counter/CELSIUS_CHANGE';
const FAHRENHEIT_CHANGE = 'redux-example/counter/FAHRENHEIT_CHANGE';


import initialState from '../reducers/initial-state';

// specify the initial state
export default function reducer(state = initialState.temperature_calculator, action) {

  const v = {...state}

  // handle actions
  switch (action.type) {

    // don't mutate the state, use object spread operator to write "{temperature: '', scale: 'c'}"
    case CELSIUS_CHANGE: {
      return {
        ...state,
        scale: 'c',
        temperature: action.temperature
      };
    }

    case FAHRENHEIT_CHANGE: {
      return {
        ...state,
        scale: 'f',
        temperature: action.temperature
      };
    }

    // no matching action, just return the given state (default or not)
    default:
      return state;
  }
}

export function celsiusChange(temperature) {
  return {
    type: CELSIUS_CHANGE,
    temperature
  };
}

export function fahrenheitChange(temperature) {
  return {
    type: FAHRENHEIT_CHANGE,
    temperature
  };
}
