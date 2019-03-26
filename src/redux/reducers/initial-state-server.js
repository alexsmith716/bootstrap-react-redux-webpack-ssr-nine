
export default req => ({

  device: {
    isMobile: req.isMobile
  },

  counter: {
    counter: req.counter
  },

});

// https://redux.js.org/recipes/structuring-reducers/initializing-state
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
