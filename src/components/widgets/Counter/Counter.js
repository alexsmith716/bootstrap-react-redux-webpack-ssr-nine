import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from '../../../redux/modules/counter';

@connect(
  (state) => ({ counterX: state.counter.counter }),
  (dispatch) => bindActionCreators(counterActions, dispatch)
)

class Counter extends Component {

  static propTypes = {
    counterX: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> Counter > componentDidMount <<<<<<<<<<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> Counter > componentWillUnmount <<<<<<<<<<<<<<<<<<<<<<');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> Counter > shouldComponentUpdate <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> Counter > getDerivedStateFromProps <<<<<<<<<<<<<<<<<<<<<<');
  // };

  render() {

    // const styles = require('./scss/Counter.scss');
    const { counterX, increment, decrement } = this.props;

    console.log('>>>>>>>>>>>>>>>> Counter > render() > this.props.counter: ', counterX);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <p>Counter Clicked!!: {counterX} times</p>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <button onClick={increment} className="btn btn-primary">increment counter</button>
                  </div>
                  <div className="form-group col-md-6">
                    <button onClick={decrement} className="btn btn-primary">decrement counter</button>
                  </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default Counter;
