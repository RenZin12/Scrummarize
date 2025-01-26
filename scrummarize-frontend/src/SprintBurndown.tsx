import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Chart.css';
import { SprintBurndownData } from './lib/types';

type SprintBurndownProps = {
  displayChart: boolean;
  setDisplayChart: Dispatch<SetStateAction<boolean>>;
  dataset: SprintBurndownData[];
};

function SprintBurndown(props: SprintBurndownProps) {
  const ref = useRef(null);

  const svgWidth = 640;
  const svgHeight = 400;

  useEffect(() => {
    getChart(props.dataset);
  }, [props.dataset]);

  function getChart(dataset: SprintBurndownData[]) {
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
      .text('Sprint Burndown');

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
      .text('Days');
    // Display y-axis legend
    contentSVG
      .append('text')
      .attr('class', 'chart__text')
      .attr('transform', 'rotate(-90)')
      .attr('x', contentHeight / -2)
      .attr('y', margin / -2)
      .text('Remaining Story Points');

    // Define domain and range for x
    const maxDay = d3.max(dataset, (data) => data.day) as number;
    const x = d3.scaleLinear().range([0, contentWidth]).domain([1, maxDay]);
    // Define domain and range for y
    const maxStoryPoint = d3.max(dataset, (data) => data.storyPoint) as number;
    const y = d3
      .scaleLinear()
      .range([contentHeight, 0])
      .domain([0, maxStoryPoint]);

    // Display x-axis
    contentSVG
      .append('g')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x));
    // Display y-axis
    contentSVG.append('g').call(d3.axisLeft(y));

    // Create the line
    const line = d3
      .line<SprintBurndownData>()
      .x((data) => x(data.day))
      .y((data) => y(data.storyPoint));
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
      .attr('cx', (data) => x(data.day))
      .attr('cy', (data) => y(data.storyPoint))
      .attr('fill', '#abdcf0')
      .attr('r', 5);
  }

  return (
    <div
      className="chart__container"
      style={{ display: props.displayChart ? 'block' : 'none' }}
      onClick={(e) => {
        props.setDisplayChart(false);
        e.stopPropagation();
      }}
    >
      <svg
        ref={ref}
        className="chart__svg"
        width={svgWidth}
        height={svgHeight}
      ></svg>
      ;
    </div>
  );
}

export default SprintBurndown;
