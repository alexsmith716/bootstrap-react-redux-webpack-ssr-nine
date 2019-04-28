import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import LoadingTwo from '../../Loading/LoadingTwo';
import debounce from 'lodash.debounce';
import drawVisualization from "../../../d3/drawLineChartBasic";

// import axiosClient from '../../../../utils/axiosClient';
import axiosClientInstance from '../../../utils/axiosClientInstance';

// Legacy API: String Refs 'this.refs.textInput': use either 'callback pattern' or 'createRef API'
// https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
// https://reactjs.org/docs/refs-and-the-dom.html#creating-refs

// when a 'ref' is passed to an element in 'render', a reference to the node becomes accessible at the 'current' attribute of the 'ref'

// IF calling bind annoys you...
// IF you are using the experimental '@babel/plugin-proposal-class-properties', 
// you can use class fields to correctly bind callbacks
// OR:
// if you aren’t using class fields syntax, you can use an arrow function in the callback


class LineChartA extends Component {

  constructor(props){
    super(props);

    // this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      responseData: null,
      error: false,
      isLoading: true,
      newData: null,
    };

    this.containerRef = createRef();
    this.inputXValueRef = createRef();
    this.inputYValueRef = createRef();
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
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.response: ', response.response);
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.error: ', response.error);
        console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > response.isLoading: ', response.isLoading);
        this.setState({ error: response.error, isLoading: response.isLoading, responseData: response.response.data });
      }, 3000 );
    });
    console.log('>>>>>>>>>>>>>>>> LineChartA > handleDataRequest > axiosClientInstance > INSTANCE: ', aci);
  };

  // <div class="svg-container mb-4">
  //   <svg class="svg-content" preserveaspectratio="xMinYMin meet" viewbox="-20 -20 400 400"></svg>
  // </div>

  handleUpdate = (e) => {
    e.preventDefault();

    console.log('>>>>>>>>>>>>>>>> LineChartA > handleUpdate > this is:', this);

    let xValue = this.inputXValueRef.current;
    let yValue = this.inputYValueRef.current;

    let x = new Date(xValue.value).toUTCString();
    let y = parseInt(yValue.value);
    let formData = {x, y};

    console.log('>>>>>>>>>>>>>>>> LineChartA > handleUpdate > xValue in: ', x);
    console.log('>>>>>>>>>>>>>>>> LineChartA > handleUpdate > yValue in: ', y);

    this.setState({ newData: formData });

    this.inputXValueRef.current.value = '';
    this.inputYValueRef.current.value = '';

    console.log('>>>>>>>>>>>>>>>> LineChartA > handleUpdate > xValue out: ', xValue.value);
    console.log('>>>>>>>>>>>>>>>> LineChartA > handleUpdate > yValue out: ', yValue.value);

    // let x = new Date(xValue.value).toUTCString();
    // let y = parseInt(yValue.value);
    // let formData = {x, y};

    // postData(formData).then(response => {
    //   this.setState({ newData: formData });
    //   this.inputXValueRef.value = '';
    //   this.inputYValueRef.value = '';
    // });
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
    // if (this.state.someStatefulValue !== prevState.someStatefulValue) {
    //   this.props.onChange(this.state.someStatefulValue);
    // }
    // if (this.props.isVisible !== prevProps.isVisible) {
    //   logVisibleChange(this.props.isVisible);
    // }
    const containerTarget = this.containerRef.current;
    const { error, isLoading, responseData, newData } = this.state;
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > error: ', error);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > isLoading: ', isLoading);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > responseData: ', responseData);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > newData: ', newData);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > containerTarget: ', containerTarget);
    if (!error && isLoading === null) {
      console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > 0000000');
      // first render of inital data
      if (responseData !== prevState.responseData) {
        console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > 111111111');
        drawVisualization(responseData.values, containerTarget);
      }
      // re-render of initial data and all 'newData'
      if (newData) {
        console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > 22222222');
        const element = containerTarget.querySelector('svg');
        element.parentNode.removeChild(element);
        const updatedData = prevState.responseData.values.concat(newData);
        // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > updatedData: ', updatedData);
        drawVisualization(updatedData, containerTarget);
      }
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
    const { containerRef, inputXValueRef, inputYValueRef } = this;

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

                  <div>
                    <div className={`svg-container mb-4`} ref={containerRef}></div>

                    <form className="form-inline" onSubmit={this.handleUpdate}>

                      <div className="form-group mb-2">
                        <label htmlFor="datePicker1" className="sr-only">Enter Time</label>
                        <input type="date" className="form-control" id="datePicker1" ref={inputXValueRef} placeholder="Enter Time" />
                      </div>
                      <div className="form-group mx-sm-3 mb-2">
                        <label className="enterValue1" className="sr-only">Enter Value</label>
                        <input type="number" className="form-control" id="enterValue1" ref={inputYValueRef} placeholder="Enter Value" />
                      </div>
                      <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>

                  </div>

                )}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LineChartA;
