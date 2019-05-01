import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementPreloadedState, decrementPreloadedState  } from '../../../redux/modules/counter';

@connect(
  (state) => ({ count: state.counter.countPreloadedState }),
  (dispatch) => bindActionCreators({ incrementPreloadedState, decrementPreloadedState }, dispatch)
)

class CounterPreloadedState2 extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementPreloadedState: PropTypes.func.isRequired,
    decrementPreloadedState: PropTypes.func.isRequired,
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
    const { count, incrementPreloadedState, decrementPreloadedState } = this.props;

    console.log('>>>>>>>>>>>>>>>> CounterPreloadedState > render() > this.props.count: ', count);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <p>Counter Preloaded State Clicked: {count} times</p>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <button onClick={decrementPreloadedState} className="btn btn-primary">decrement counter</button>
                  </div>
                  <div className="form-group col-md-6">
                    <button onClick={incrementPreloadedState} className="btn btn-primary">increment counter</button>
                  </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default CounterPreloadedState2;
