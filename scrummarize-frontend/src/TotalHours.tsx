import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { TotalHoursData } from './lib/types';
import * as d3 from 'd3';

type TotalHoursProps = {
  dataset: TotalHoursData[] | null;
  setDataset: Dispatch<SetStateAction<TotalHoursData[] | null>>;
};

function TotalHours(props: TotalHoursProps) {
  const ref = useRef(null);

  const svgWidth = 640;
  const svgHeight = 400;

  useEffect(() => {
    if (props.dataset !== null) {
      getChart(props.dataset);
    }
  }, [props.dataset]);

  function getChart(dataset: TotalHoursData[]) {
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
      .text('Time Spent Per Day');

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
      .text('Day');
    // Display y-axis legend
    contentSVG
      .append('text')
      .attr('class', 'chart__text')
      .attr('transform', 'rotate(-90)')
      .attr('x', contentHeight / -2)
      .attr('y', margin / -2)
      .text('Hours Spent');

    // Define domain and range for x
    const x = d3
      .scaleBand()
      .domain(dataset.map((data) => data.day))
      .range([0, contentWidth])
      .padding(0.1);

    // Define domain and range for y
    const maxHoursSpent = d3.max(dataset, (data) => data.hoursSpent) as number;
    const y = d3
      .scaleLinear()
      .domain([0, maxHoursSpent])
      .range([contentHeight, 0]);

    // Display x-axis
    contentSVG
      .append('g')
      .attr('transform', `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    // Display y-axis
    contentSVG.append('g').call(d3.axisLeft(y).ticks(maxHoursSpent));

    // Display bars
    contentSVG
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll()
      .data(dataset)
      .join('rect')
      .attr('x', (d) => x(d.day) as number)
      .attr('y', (d) => y(d.hoursSpent))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.hoursSpent));
  }

  return (
    <div
      className="chart__container"
      style={{ display: props.dataset === null ? 'none' : 'block' }}
      onClick={() => {
        props.setDataset(null);
      }}
    >
      <svg
        ref={ref}
        className="chart__svg"
        width={svgWidth}
        height={svgHeight}
      ></svg>
    </div>
  );
}

export default TotalHours;
