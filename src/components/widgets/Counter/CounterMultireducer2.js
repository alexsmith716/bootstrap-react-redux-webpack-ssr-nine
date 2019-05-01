import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import { incrementMultireducer, decrementMultireducer  } from '../../../redux/modules/counter';

@connect(
  (state, { as }) => ({  count: state.counterCollection2[as].countMultireducer }),
  (dispatch, { as }) => bindActionCreators({ incrementMultireducer, decrementMultireducer  }, dispatch, as)
)

class CounterMultireducer2 extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementMultireducer: PropTypes.func.isRequired,
    decrementMultireducer: PropTypes.func.isRequired,
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
    const { count, incrementMultireducer, decrementMultireducer } = this.props;

    // console.log('>>>>>>>>>>>>>>>> CounterMultireducer > render() > this.props.count: ', count);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <p>Counter Multireducer Clicked: {count} times</p>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <button onClick={decrementMultireducer} className="btn btn-primary">decrement counter</button>
                  </div>
                  <div className="form-group col-md-6">
                    <button onClick={incrementMultireducer} className="btn btn-primary">increment counter</button>
                  </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default CounterMultireducer2;
