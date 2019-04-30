import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import * as temperatureCalculatorActions from '../../../redux/modules/temperatureCalculator';

import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';
import { toCelsius, toFahrenheit, tryConvert } from './stateHelpers';

@connect(
  (state, { as }) => ({ 
    temperature: state.temperatureCalculatorCollection[as].temperature,
    scale: state.temperatureCalculatorCollection[as].scale,
    // counterX: state.counterCollection[as].counter,
  }),
  (dispatch, { as }) => bindActionCreators(temperatureCalculatorActions, dispatch, as)
)

class TemperatureCalculator extends Component {

  static propTypes = {
    // counterX: PropTypes.number,
    temperature: PropTypes.string.isRequired,
    scale: PropTypes.string.isRequired,
    celsiusChange: PropTypes.func.isRequired,
    fahrenheitChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > componentDidMount <<<<<<<<<<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > componentWillUnmount <<<<<<<<<<<<<<<<<<<<<<');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > shouldComponentUpdate <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > getDerivedStateFromProps <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // yes, single parameter (skip parenthesis) more than one (parenthesis required)
  // one returned expression (skip curly braces) more than one (curly braces required with return keyword)
  // handleCelsiusChange = (temperature) => {
  //   this.setState( { scale: 'c', temperature } );
  // }

  // handleFahrenheitChange = (temperature) => {
  //   this.setState( { scale: 'f', temperature } );
  // }

  // examine 'this.props' and 'this.state' and return a React element
  // called each time an update happens (state update, network update, HMR update)
  render() {

    // const scale = this.state.scale;
    // const temperature = this.state.temperature;
    const { scale, temperature, celsiusChange, fahrenheitChange } = this.props;

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    const styles = require('./scss/TemperatureCalculator.scss');

    // const styles = require('./scss/TemperatureCalculator.scss');

    // FIRE JS EVENT HANDLER: 'onChange'
    // 'onChange' event initiates 'this.handleChange'
    // 'handleChange' passes the value of '<input>' to (e.target.value)
    // 'handleChange' calls its prop method 'this.props.onTemperatureChange(e.target.value)'

    // >>>>>>>>> PROP >>>>>>>>>>> 'onTemperatureChange' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // 'onTemperatureChange' of the 'Celsius' 'TemperatureInput' is this component's 'handleCelsiusChange' method
    // 'onTemperatureChange' of the 'Fahrenheit' 'TemperatureInput' is this component's 'handleFahrenheitChange' method

    // console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > RENDER !!!!!! > this.props.counterX: ', this.props.counterX);
    console.log('>>>>>>>>>>>>>>>> TemperatureCalculator > RENDER !!!!!! > temperature: ', temperature , ' > scale: ', scale);

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="width-400">

              <form>

                <TemperatureInput
                  scale="c"
                  temperature={ celsius }
                  onTemperatureChange={ celsiusChange } />

                <TemperatureInput
                  scale="f"
                  temperature={ fahrenheit }
                  onTemperatureChange={ fahrenheitChange } />

              </form>

              <BoilingVerdict celsius={ parseFloat(celsius) } />

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default TemperatureCalculator;
