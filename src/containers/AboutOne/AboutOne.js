import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import { withStore } from '../../../hoc';

import IncorporationForm from '../../components/widgets/Shareholders/IncorporationForm';
import CatsForm from '../../components/widgets/CatsForm/CatsForm';
import Clock from '../../components/widgets/Clock/Clock';
import RandomBootstrapAlert from '../../components/widgets/RandomBootstrapAlert/RandomBootstrapAlert';
import FilterableTable from '../../components/FilterableTable/FilterableTable';
import TemperatureCalculator from '../../components/widgets/LiftingStateUp/TemperatureCalculator';
// import CounterPreloadedState from '../../components/widgets/Counter/CounterPreloadedState';
import CounterPreloadedState2 from '../../components/widgets/Counter/CounterPreloadedState2';
import CounterMultireducer2 from '../../components/widgets/Counter/CounterMultireducer2';

// --------------------------------------------------------------------------

// @withStore

class AboutOne extends Component {

  // constructor(props) {
  //   super(props);

  // static propTypes = {};
  // static defaultProps = {};

  // state = {};

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> AboutOne > componentDidMount() <<<<<<<<<<<<<<');
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> AboutOne > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  // static contextTypes = {
  //   store: PropTypes.objectOf(PropTypes.any).isRequired
  // };

  render() {

    const styles = require('./scss/AboutOne.scss');
    // const uri = encodeURI('/product-categories-small.json');
    // const uri = encodeURI('/product-categories.json');

    // const dropdownTiltle = 'Select Product Table';

    const dropDownOptions = [
      'https://api.github.com/feeds',
      'https://api.github.com/emojis',
      'https://api.github.com/events',
      'https://api.github.com/gists/public',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
      '/json-data/product-categories-small.json',
      '/json-data/product-categories.json',
    ];

    const dropDownOptions2 = [
      'https://api.github.com/feeds',
      'https://api.github.com/emojis',
      'https://api.github.com/events',
      'https://api.github.com/gists/public',
      '/json-data/product-categories-small2.json',
      '/json-data/product-categories2.json',
    ];

    // const dropDownOptionSelected = this.state.dropDownOptionSelected;
    // let filterableTable;

    // if (dropDownOptionSelected !== '') {
    //   filterableTable = <FilterableTable requestURL={ dropDownOptionSelected } />;
    // }

    return (

      <div className="container">

        <Helmet title="About One" />

        <h1 className={styles.uniqueColor}>About One</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterPreloadedState2
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <CounterPreloadedState2 />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic CounterMultireducer2 'AboutTwoMultireducer1'
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <CounterMultireducer2 as="AboutOneMultireducer1" />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 1
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <FilterableTable optionsArray={dropDownOptions} description='Filterable Product Table 1' />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Filterable Product Table 2
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <FilterableTable optionsArray={dropDownOptions2} description='Filterable Product Table 2' />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Dynamic, Controlled Form 3
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <CatsForm />

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React Dynamics!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Making dynamic form inputs with React
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <IncorporationForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Dynamic, Controlled Form 1
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Dynamic, Controlled Form 2
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Cats Form
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <CatsForm />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Clock: state and lifecycle in a basic React component!
              </h2>

              <div className="card-body text-center">

                <div className="card-title">

                  <RandomBootstrapAlert />

                  <p>With supporting text below as a natural lead-in to additional content.</p>

                  <a href="#" className="btn btn-primary">Go somewhere</a>

                </div>
              </div>

              <div className="card-footer text-muted text-center">

                <Clock />

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 'AboutOne1'
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <TemperatureCalculator as="AboutOne1" />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Lifting State Up 'AboutOne2'
                </h5>

                <div className="card-body-container">

                  <div className="card-body-content">

                    <TemperatureCalculator as="AboutOne2" />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

      </div>
    );
  }
}

export default AboutOne;
