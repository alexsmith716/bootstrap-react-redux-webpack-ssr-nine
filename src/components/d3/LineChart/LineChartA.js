import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingTwo from '../../Loading/LoadingTwo';
import axios from 'axios';
import * as d3 from 'd3';
import { axiosData } from '../../../utils/axiosClient';


class LineChartA extends Component {

  constructor(props){
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      externalData: null,
      newData: null,
    };
    console.log('>>>>>>>>>>>>>>>> LineChartA > constructor(props) <<<<<<<<<<<<<<<<<<<<<<');
  }

  static propTypes = {
    request: PropTypes.string.isRequired,
    description: PropTypes.string,
  };

  // an option, since having 'super(props)' >>> 'this.props.request'
  // >> 'The constructor for a React component is called before it is mounted' <<
  // make request on 'componentDidMount' with super prop 'request' (it's already ready)
  // then, on 'componentDidUpdate', test either (prevProps, prevState) against new value
  // BUT, when should a parent hold a state VS a child -like for testing purposes??
  // AND, WHO should fetch the data, parent or child -like for testing purposes??

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<');
    axiosData(this.props.request).then(response => {
      setTimeout( () => {
        // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.response.data: ', response.response.data);
        // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.error: ', response.error);
        // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.isLoading: ', response.isLoading);
        this.setState({ error: response.error, isLoading: response.isLoading, externalData: response.response.data });
      }, 3000 );
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate lifecycle is guaranteed to be invoked only once per update
    // --------------------------------------------------------------------------------
    // if (this.state.someStatefulValue !== prevState.someStatefulValue) {
    //   this.props.onChange(this.state.someStatefulValue);
    // }
    // if (this.props.isVisible !== prevProps.isVisible) {
    //   logVisibleChange(this.props.isVisible);
    // }
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > externalData: ', this.state.externalData);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > error: ', this.state.error);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > isLoading: ', this.state.isLoading);
    if (!this.state.error && this.state.isLoading === null) {
      if (prevState.externalData) {
        // const payload = prevState.externalData.values.concat(this.state.externalData.values);
        const elem = document.querySelector('#LineChart svg');
        elem.parentNode.removeChild(elem);
      }
      this.renderLineChart(this.state.externalData);
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  }

  // invoked before rendering when new props or state are being received
  // --------------------------------------------------------------------------------
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate() > nextProps: ', nextProps);
    return nextProps;
  };

  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // --------------------------------------------------------------------------------
  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> LineChart > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // ================================================================================

  // https://www.w3.org/TR/SVG/coords.html
  // https://css-tricks.com/scale-svg/

  // All SVG content is drawn inside SVG viewports
  // *** Note the term SVG viewport is distinct from the 'viewport' term used in CSS ***

  // (D3) resize an SVG when window is resized
  // --------------------------------------------------------------------------------

  // 'viewBox' attribute:
  // --------------------------------------------------------------------------------
  // to dynamically resizing SVGs two basic attributes used: 'viewBox' and 'preserveAspectRatio'
  // 'viewBox' attribute component of SVGs makes them scalable
  // 'viewBox' defines the aspect ratio, the inner scaling of object lengths and coordinates,
  //    and the axis coordinates (x and y) >>>> (where the SVG should originate) <<<<<

  // 'preserveAspectRatio' attribute:
  // --------------------------------------------------------------------------------
  // 'preserveAspectRatio' attribute, determines if the SVG should scale when the aspect ratio defined in 'viewBox' doesn't match the ratio in the parent container
  // so, 'preserveAspectRatio' requires that the 'viewBox' attribute also be set to function
  // in most cases, this 'preserveAspectRatio' defined as: 
  //    '<svg preserveAspectRatio="xMidYMid meet"></svg>'

  // this forces uniform scaling for both the 'x' and 'y', aligning the midpoint of the SVG object with the midpoint of the container element

  // Example viewBox values:

  // * viewBox="0 0 100 100": 
  //  Defines a coordinate system 100 units wide and 100 units high. 
  //    In other words, if your SVG contains a circle centered in the graphic with radius of 50px, it would fill up the height or width of the SVG image, 
  //    even if the image was displayed full screen. If your SVG contained a rectangle with height="1in", 
  //    it would also nearly fill up the screen, because 1 inch = 96px in CSS, and all lengths will get scaled equally.

  // * viewBox="5 0 90 100": 
  //  Almost the same view, but cropped in by 5% on the left and right, so that the total width=90 units and the x-coordinate on the left=5.

  // * viewBox="-50 -50 100 100": 
  //  A view with the same scale, but now with the top-left corner given the coordinates (-50, -50). 
  //    Which means that the bottom-right corner has the coordinates (+50, +50). 
  //    Any shapes drawn at (100, 100) will be far offscreen. 
  //    If you wanted to draw a circle that completely filled the image area, it would be centered at (0, 0).

  renderLineChart(payload) {
    if(!payload) return;
    d3.selectAll('.dot').remove();
    let data = payload.values;
    let width = 400;
    let height = 400;
    let margin = 50;
    let duration = 250;

    let lineOpacity = '0.25';
    let lineOpacityHover = '0.85';
    let otherLinesOpacityHover = '0.1';
    let lineStroke = '1.5px';
    let lineStrokeHover = '2.5px';

    let circleOpacity = '0.85';
    let circleOpacityOnLineHover = '0.25';
    let circleRadius = 3;
    let circleRadiusHover = 6;

    data.forEach(function (d) {
      d.x = new Date(d.x);
      d.y = +d.y;
    });

    /* Scale */
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.x))
      .range([0, width - margin]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height - margin, 0]);

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    let svg = d3
      .select('#LineChart')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet') // 'xMinYMin' - Force uniform scaling | 'meet' - aspect ratio is preserved
      .attr('viewBox', '-20 -20 400 400')
      .classed('svg-content', true);
      // .attr('width', width + margin + 'px')
      // .attr('height', height + margin + 'px')
      // .append('g')
      // .attr('transform', `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    let line = d3
      .line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    let lines = svg.append('g').attr('class', 'lines');

    lines
      .selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'line-group')
      .append('path')
      .attr('class', 'line')
      .attr('d', () => line(data))
      .style('stroke', (d, i) => color(i))
      .style('opacity', lineOpacity)
      .on('mouseover', function (d) {
        d3.selectAll('.line').style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle').style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style('stroke-width', lineStrokeHover)
          .style('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.selectAll('.line').style('opacity', lineOpacity);
        d3.selectAll('.circle').style('opacity', circleOpacity);
        d3.select(this)
          .style('stroke-width', lineStroke)
          .style('cursor', 'none');
      });

    /* Add circles in the line */
    lines
      .selectAll('circle-group')
      .data(data)
      .enter()
      .append('g')
      // .style('fill', (d, i) => color(i))
      .selectAll('circle')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'circle')
      .on('mouseover', function (d) {
        d3.select(this)
          .style('cursor', 'pointer')
          .append('text')
          .attr('class', 'text')
          .text(`${d.y}`)
          .attr('x', d => xScale(d.x) + 5)
          .attr('y', d => yScale(d.y) - 10);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .style('cursor', 'none')
          .transition()
          .duration(duration)
          .selectAll('.text')
          .remove();
      })
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', circleRadius)
      .style('opacity', circleOpacity)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('r', circleRadiusHover);
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr('r', circleRadius);
      });

    /* Add Axis into SVG */
    let xAxis = d3.axisBottom(xScale).ticks(5);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis)
      .append('text')
      .attr('x', width - 60)
      .attr('y', 30)
      .attr('fill', '#000')
      .text('Time');

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#000')
      .text('Values');
  }

  render() {

    // const styles = require('./scss/LineChartA.scss');
    const { error, isLoading, externalData } = this.state;
    const { description } = this.props;

    // console.log('>>>>>>>>>>>>>>>> LineChartA > render() > externalData: ', externalData);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > render() > error: ', error);
    // console.log('>>>>>>>>>>>>>>>> LineChartA > render() > isLoading: ', isLoading);

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

              {externalData !== null &&
                !isLoading && (

                  <div id="LineChart" className="svg-container"></div>

                )}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LineChartA;
