import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as d3 from 'd3';
import { axiosData } from '../../../utils/axiosData';


class LineChartA extends Component {

  constructor(props){
    super(props);

    this.state = {
      error: false,
      isLoading: true,
      externalData: null,
    };
  }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<');
    axiosData().then(response => {
      setTimeout( () => {
        console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.response.data: ', response.response.data);
        console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.error: ', response.error);
        console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidMount() > axiosData > response.isLoading: ', response.isLoading);
        this.setState({ error: response.error, isLoading: response.isLoading, externalData: response.response.data });
      }, 2000 );
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
    if (!this.state.error && this.state.isLoading === null) {
      if (prevState.externalData) {
        const payload = prevState.externalData.values.concat(this.state.externalData.values);
        const elem = document.querySelector('#LineChart svg');
        elem.parentNode.removeChild(elem);
      }
      this.renderLineChart(this.state.externalData);
    }
  }

  renderLineChart(payload) {
    if(!payload) return;
    d3.selectAll(".dot").remove();
    let data = payload.values;
    let width = 500;
    let height = 300;
    let margin = 50;
    let duration = 250;

    let lineOpacity = "0.25";
    let lineOpacityHover = "0.85";
    let otherLinesOpacityHover = "0.1";
    let lineStroke = "1.5px";
    let lineStrokeHover = "2.5px";

    let circleOpacity = "0.85";
    let circleOpacityOnLineHover = "0.25";
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
      .select("#LineChart")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    let line = d3
      .line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .append("path")
      .attr("class", "line")
      .attr("d", () => line(data))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function (d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function (d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      // .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.y}`)
          .attr("x", d => xScale(d.x) + 5)
          .attr("y", d => yScale(d.y) - 10);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    let xAxis = d3.axisBottom(xScale).ticks(5);
    let yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .append("text")
      .attr("x", width - 60)
      .attr("y", 30)
      .attr("fill", "#000")
      .text("Time");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Values");
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> LineChartA > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate() <<<<<<<<<<<<<<<<<<<<<<');
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> LineChart > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  // };

  render() {

    // const styles = require('./scss/LineChartA.scss');

    return (
      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="bg-color-ivory container-padding-border-radius-2">
            <div className="display-flex-justify-direction-align-center">

              <p>D3 Line Chart</p>

              <div id="LineChart" style={{position:"relative"}}></div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LineChartA;