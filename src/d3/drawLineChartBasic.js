// import * as d3 from 'd3';
import { range, max, ticks, extent } from 'd3-array';
import { selectAll, select } from 'd3-selection';
import { scaleTime, scaleLinear, scaleOrdinal } from 'd3-scale';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { transition } from 'd3-transition';

export default function drawLineChartBasic(payload, containerTarget) {
  // console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > payload: ', payload);
  console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > containerTarget: ', containerTarget);

  if(!payload) return;
  selectAll('.dot').remove();
  let data = payload.values;
  console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > DATA: ', data);
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
  let xScale = scaleTime()
    .domain(extent(data, d => d.x))
    .range([0, width - margin]);

  let yScale = scaleLinear()
    .domain([0, max(data, d => d.y)])
    .range([height - margin, 0]);

  let color = scaleOrdinal(schemeCategory10);

  /* Add SVG */
  let svg = select(containerTarget)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet') // 'xMinYMin' - Force uniform scaling | 'meet' - aspect ratio is preserved
    .attr('viewBox', '-20 -20 400 400')
    .classed('svg-content', true);

  /* Add line into SVG */
  let addedLine = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  let lines = svg.append('g').attr('class', 'lines');

  console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > LINES: ', lines);

  // https://github.com/d3/d3/blob/master/API.md
  // https://github.com/d3/d3-selection/blob/master/README.md
  // to build a D3 visualization: select, create, configure, and modify SVG elements

  // 3 ways to reference an element:
  //  1) select a single existing element
  //  2) select multiple elements at once
  //  3) procedurally create elements and add them to the DOM

  // ###########################################################################################################################
  // Selection methods come in  two forms: select and selectAll: 
  //  the former selects only the first matching element, while the latter selects all matching elements in document order.
  // ###########################################################################################################################
  //  The top-level selection methods, d3.select and d3.selectAll, query the entire document; 
  //    the subselection methods, selection.select and selection.selectAll, restrict selection to descendants of the selected elements.
  // ###########################################################################################################################
  // MIND THE SEMICOLON !!!!!!!!!!!!!!!!!!!!!!
  // ###########################################################################################################################

  lines
    .selectAll('.line-group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'line-group')
    .append('path')
    .attr('class', 'line')
    .attr('d', () => addedLine(data))
    .style('stroke', (d, i) => color(i))
    .style('opacity', lineOpacity);

  svg.select('.lines').selectAll('.line-group').selectAll('.line')
    .on('mouseover', function (d) {
      console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > svg > mouseover > this: ', this);
      // select('.line').style('opacity', otherLinesOpacityHover);
      // select('.circle').style('opacity', circleOpacityOnLineHover);
      select(this)
        .style('opacity', otherLinesOpacityHover)
        .style('opacity', lineOpacityHover)
        .style('stroke-width', lineStrokeHover)
        .style('cursor', 'pointer');
    })
    .on('mouseout', function (d) {
      // select('.line').style('opacity', lineOpacity);
      // select('.circle').style('opacity', circleOpacity);
      select(this)
        .style('opacity', lineOpacity)
        .style('stroke-width', lineStroke)
        .style('cursor', 'none');
    });

  /* Add Axis into SVG */
  let xAxis = axisBottom(xScale).ticks(5);
  let yAxis = axisLeft(yScale).ticks(5);

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

  console.log('>>>>>>>>>>>>>>>> export default function drawLineChartBasic() > return svg: ', svg);
  return svg;
}
