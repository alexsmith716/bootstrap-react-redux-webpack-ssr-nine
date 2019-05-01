import { List } from 'immutable';

// defines state shape

export default {

  devicePreloadedState: {
    isMobile: null
  },

  counterPreloadedState: {
    count: null
  },

  counterMultireducer: {
    count: 0
  },

  temperatureCalculator: {
    temperature: '',
    scale: 'c'
  },

};

// Counter:

// CatsForm
// Clock
// TemperatureCalculator
// IncorporationForm
// RandomBootstrapAlert