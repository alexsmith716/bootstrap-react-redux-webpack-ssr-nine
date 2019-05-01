import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import * as counterActions from '../../../redux/modules/counterMultireducer';

@connect(
  (state, { as }) => ({ 
    count: state.counterCollection[as].count
  }),
  (dispatch, { as }) => bindActionCreators(counterActions, dispatch, as)
)

class CounterMultireducer extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> CounterMultireducer > componentDidMount <<<<<<<<<<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> CounterMultireducer > componentWillUnmount <<<<<<<<<<<<<<<<<<<<<<');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> CounterMultireducer > shouldComponentUpdate <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> CounterMultireducer > getDerivedStateFromProps <<<<<<<<<<<<<<<<<<<<<<');
  // };

  render() {

    // const styles = require('./scss/CounterMultireducer.scss');
    const { count, increment, decrement } = this.props;

    // console.log('>>>>>>>>>>>>>>>> CounterMultireducer > render() > this.props.count: ', count);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <p>Counter Multireducer Clicked: {count} times</p>

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

export default CounterMultireducer;
