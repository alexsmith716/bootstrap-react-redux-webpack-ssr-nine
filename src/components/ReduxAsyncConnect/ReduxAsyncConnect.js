import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';
import { trigger } from 'redial';
import NProgress from 'nprogress';
import asyncMatchRoutes from '../../utils/asyncMatchRoutes';

@withRouter 

class ReduxAsyncConnect extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    previousLocation: null,
    lastLocation: null,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > componentDidMount() <<<<<<<<<<<<<<');
    // NProgress.configure({ trickleSpeed: 200 });
  }

  static getDerivedStateFromProps(props, state) {
    console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > getDerivedStateFromProps() <<<<<<<<<<<<<<');
    const navigated = props.location !== state.lastLocation;

    if (navigated) {
      return {
        previousLocation: null,
        lastLocation: props.location
      }
    }
    return null;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > shouldComponentUpdate() <<<<<<<<<<<<<<');
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > getSnapshotBeforeUpdate() <<<<<<<<<<<<<<');
  // }

  setTimeoutCallback = () => NProgress.done();

  componentDidUpdate(prevProps, prevState) {

    NProgress.start();

    if (prevState.previousLocation !== null) {
      NProgress.done();
    }

    if (prevState.previousLocation === null) {

      NProgress.start();

      NProgress.done()

      // setTimeout(() => this.setTimeoutCallback(), 1000 );
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  // ----------------------------------------------------------------------------------------------------------

  render() {

    const { children, location } = this.props;
    const { previousLocation } = this.state;

    // console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > render() > children:', children);
    // console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > render() > location:', location);
    // console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > render() > previousLocation:', previousLocation);

    const theRoute = <Route location={previousLocation || location} render={() => children} />;
    // console.log('>>>>>>>>>>>>>>>> ReduxAsyncConnect > render() > <Route>:', theRoute);

    return <Route location={previousLocation || location} render={() => children} />;
  }
}

export default ReduxAsyncConnect;
