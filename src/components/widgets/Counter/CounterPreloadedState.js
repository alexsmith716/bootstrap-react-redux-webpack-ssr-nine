import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from '../../../redux/modules/counterPreloadedState';

@connect(
  (state) => ({ count: state.counterPreloadedState.count }),
  (dispatch) => bindActionCreators(counterActions, dispatch)
)

class CounterPreloadedState extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > componentDidMount <<<<<<<<<<<<<<<<<<<<<<');
    console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > componentDidMount > this.props.count: ', this.props.count);
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > componentWillUnmount <<<<<<<<<<<<<<<<<<<<<<');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > shouldComponentUpdate <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > getDerivedStateFromProps <<<<<<<<<<<<<<<<<<<<<<');
  // };

  render() {

    // const styles = require('./scss/CounterPreloadedState.scss');
    const { count, increment, decrement } = this.props;

    console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > render() > this.props.count: ', count);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <p>Counter Preloaded State Clicked: {count} times</p>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <button onClick={decrement} className="btn btn-primary">decrement counter</button>
                  </div>
                  <div className="form-group col-md-6">
                    <button onClick={increment} className="btn btn-primary">increment counter</button>
                  </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default CounterPreloadedState;
