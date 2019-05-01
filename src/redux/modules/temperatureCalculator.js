const CELSIUS_CHANGE = 'redux-example/counter/CELSIUS_CHANGE';
const FAHRENHEIT_CHANGE = 'redux-example/counter/FAHRENHEIT_CHANGE';

import initialState from '../initial-state';


export default function reducer(state = initialState.temperatureCalculator, action) {

  switch (action.type) {

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
