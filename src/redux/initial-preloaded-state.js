
export default req => ({

  devicePreloadedState: {
    isMobile: req.isMobile
  },

  // counterPreloadedState: {
  //   count: req.counter
  // },

  counter: {
    countPreloadedState: req.counter,
    countMultireducer: 0
  },

});
