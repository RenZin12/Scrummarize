import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Chart.css';
import { AccumulationOfEffortData } from './lib/types';

type AccumulationOfEffortProps = {
  displayChart: boolean;
  setDisplayChart: Dispatch<SetStateAction<boolean>>;
  dataset: AccumulationOfEffortData[];
};

function AccumulationOfEffort(props: AccumulationOfEffortProps) {
  const ref = useRef(null);

  const svgWidth = 640;
  const svgHeight = 400;

  useEffect(() => {
    const dataset = props.dataset.map((data) => ({
      ...data,
      date: new Date(data.date),
    }));

    getChart(dataset);
  }, [props.dataset]);

  function getChart(dataset: AccumulationOfEffortData[]) {
    const margin = 50;
    const contentWidth = svgWidth - margin - margin;
    const contentHeight = svgHeight - margin - margin;

    // Select svg
    const svg = d3.select(ref.current);

    // Remove previous elements
    svg.selectAll('*').remove();

    // Display title
    svg
      .append('text')
      .attr('class', 'chart__text chart__text--title')
      .attr('x', svgWidth / 2)
      .attr('y', margin / 2)
      .text('Accumulation of Effort');

    // Add group for content
    const contentSVG = svg
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    // Display x-axis legend
    contentSVG
      .append('text')
      .attr('class', 'chart__text chart__text--x')
      .attr('x', contentWidth / 2)
      .attr('y', contentHeight + margin / 2)
      .text('Date');
    // Display y-axis legend
    contentSVG
      .append('text')
      .attr('class', 'chart__text')
      .attr('transform', 'rotate(-90)')
      .attr('x', contentHeight / -2)
      .attr('y', margin / -2)
      .text('Total Hours');

    // Define domain and range for x
    const extentDate = d3.extent(dataset, (data) => data.date) as [Date, Date];
    const x = d3.scaleTime().range([0, contentWidth]).domain(extentDate);
    // Define domain and range for y
    const maxTotalHours = d3.max(dataset, (data) => data.totalHours) as number;
    const y = d3
      .scaleLinear()
      .range([contentHeight, 0])
      .domain([0, maxTotalHours]);

    // Display x-axis
    contentSVG
      .append('g')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x));
    // Display y-axis
    contentSVG.append('g').call(d3.axisLeft(y));

    // Create the line
    const line = d3
      .line<AccumulationOfEffortData>()
      .x((data) => x(data.date))
      .y((data) => y(data.totalHours));
    contentSVG
      .append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Display vertical grid lines
    contentSVG
      .selectAll('xGrid')
      .data(x.ticks())
      .join('line')
      .attr('x1', (data) => x(data))
      .attr('x2', (data) => x(data))
      .attr('y1', 0)
      .attr('y2', contentHeight)
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1);
    // Display horizontal grid lines
    contentSVG
      .selectAll('yGrid')
      .data(y.ticks().slice(1))
      .join('line')
      .attr('x1', 0)
      .attr('x2', contentWidth)
      .attr('y1', (data) => y(data))
      .attr('y2', (data) => y(data))
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 1);

    // Display circle labels
    contentSVG
      .append('g')
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (data) => x(data.date))
      .attr('cy', (data) => y(data.totalHours))
      .attr('fill', '#abdcf0')
      .attr('r', 5);
  }

  return (
    <div
      className="accumulation-of-effort__container"
      style={{ display: props.displayChart ? 'block' : 'none' }}
      onClick={() => props.setDisplayChart(false)}
    >
      <svg
        ref={ref}
        className="accumulation-of-effort__svg"
        width={svgWidth}
        height={svgHeight}
      ></svg>
      ;
    </div>
  );
}

export default AccumulationOfEffort;
