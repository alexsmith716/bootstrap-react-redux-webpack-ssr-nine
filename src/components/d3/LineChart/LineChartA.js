import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import LoadingTwo from '../../Loading/LoadingTwo';
import debounce from 'lodash.debounce';
import drawVisualization from "../../../d3/drawLineChartBasic";

// import axiosClient from '../../../../utils/axiosClient';
import axiosClientInstance from '../../../utils/axiosClientInstance';


class LineChartA extends Component {

  constructor(props){
    super(props);

    // this. = this..bind(this);

    this.state = {
      responseData: null,
      error: false,
      isLoading: true,
    };

    this.containerRef = createRef();
    console.log('>>>>>>>>>>>>>>>> LineChartA > constructor(props) <<<<<<<<<<<<<<<<<<<<<<');
  }

  static propTypes = {
    // responseData: PropTypes.object,
    // responseData: PropTypes.objectOf(PropTypes.any),
    request: PropTypes.string,
    error: PropTypes.bool,
    isLoading: PropTypes.bool,
    description: PropTypes.string,
  }

  handleDataRequest = (req) => {
    console.log('>>>>>>>>>> AboutTwo > handleDataRequest() > req: ', req)
    let aci = axiosClientInstance(req).then(response => {
      setTimeout( () => {
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.response.data: ', response.response.data);
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.error: ', response.error);
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.isLoading: ', response.isLoading);
        this.setState({ error: response.error, isLoading: response.isLoading, responseData: response.response.data });
      }, 3000 );
    });
    console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > INSTANCE: ', aci);
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<');
    const { request } = this.props;
    this.handleDataRequest(request);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<');
    // componentDidUpdate lifecycle is guaranteed to be invoked only once per update
    // --------------------------------------------------------------------------------
    const containerTarget = this.containerRef.current;
    const { error, isLoading, responseData } = this.state;
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > responseData: ', responseData);
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > error: ', error);
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > isLoading: ', isLoading);
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > containerTarget: ', containerTarget);
    if (!error && isLoading === null) {
      if (prevState.responseData) {
        // const payload = prevState.responseData.values.concat(this.props.responseData.values);
        // const elem = document.querySelector('#LineChartA svg');
        // elem.parentNode.removeChild(elem);
      }
      drawVisualization(responseData, containerTarget);
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  }

  // invoked before rendering when new props or state are being received
  // --------------------------------------------------------------------------------
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> LineChartA > shouldComponentUpdate() > nextProps: ', nextProps);
    return nextProps;
  };

  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // --------------------------------------------------------------------------------
  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> LineChart > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // ================================================================================

  render() {

    // const styles = require('./scss/LineChartA.scss');
    const { error, isLoading, responseData } = this.state;
    const { description } = this.props;
    const { containerRef } = this;

    console.log('>>>>>>>>>>>>>>>> LineChartA > render() > responseData: ', responseData);
    console.log('>>>>>>>>>>>>>>>> LineChartA > render() > error: ', error);
    console.log('>>>>>>>>>>>>>>>> LineChartA > render() > isLoading: ', isLoading);
    console.log('>>>>>>>>>>>>>>>> LineChartA > render() > description: ', description);

    // <div class="svg-container LineChartA__lineChart--dEEuc2Nzc">
    //  <svg class="svg-content" preserveaspectratio="xMinYMin meet" viewbox="-20 -20 400 400"></svg>
    // </div>

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="display-flex-justify-direction-align-center width-500">

              <p>{description}</p>

              {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {!error &&
                isLoading && (

                  <LoadingTwo text="LOADING" />

                )}

              {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {error &&
                !isLoading && (

                  <div className="alert alert-danger text-center" role="alert">ERROR</div>

                )}

              {/* (>>>>>>>>>>>>>>>>>>>>>> DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {responseData !== null &&
                !isLoading && (

                  <div className={`svg-container`} ref={containerRef}></div>

                )}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LineChartA;
