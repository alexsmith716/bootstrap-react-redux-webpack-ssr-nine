
export default req => ({

  device: {
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
