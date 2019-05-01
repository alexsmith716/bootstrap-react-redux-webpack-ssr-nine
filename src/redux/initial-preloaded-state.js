
export default req => ({

  devicePreloadedState: {
    isMobile: req.isMobile
  },

  counterPreloadedState: {
    count: req.counter
  },

});
