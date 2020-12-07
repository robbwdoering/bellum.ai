import React, { useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { requestChartRefresh } from "./../war/actions";
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 40, left: 60 };

const color = ['#f05440', '#d5433d', '#b33535', '#283250'];

export const BarChart = props => {
	const { name, listId, parentData, reduxData, config, requestChartRefresh } = props;
	const ref = useRef();

	const [initDone, finishInit] = useState(false);
	const w = useMemo(() => config ? (config.width - margin.left - margin.right) : 300);
	const h = useMemo(() => config ? (config.height - margin.top - margin.bottom) : 300);

	// Use parent data if available, otherwise use what redux has
	const data = useMemo(() => parentData || reduxData, [parentData, reduxData]);

	useEffect(() => {
		if (name){
			requestChartRefresh(name, listId);
		}
	}, [ name ]);

	useEffect(() => {
		if (data && ref.current && config) {
			console.log("Executing effect", config);
			let svg = select(ref.current)

	        // scales
	        const dataMax = max(data, d => d.value)

	        const dataScale = scaleLinear()
		        .domain([0, dataMax])
		        .range([0, config.isVert ? h : w]);

	        const nameScale = scaleBand()
		        .domain(data.map(d => d.name))
		        .rangeRound([0, config.isVert ? w : h])
		        .paddingInner(0.25);


	        if (!initDone) {
		        // append group translated to chart area
		        svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

		        // draw header
		        svg
			        .append('g')
			        .attr('class', 'bar-header')
			        .attr('transform', `translate(0, ${-margin.top / 2})`)
			        .append('text')
			        .append('tspan')
			        .text('Horizontal bar chart');
	        }

	        // draw bars
	        const bars = svg
		        .selectAll('.bar')
		        .data(data);
		    bars
		        .enter()
		        .append('rect')
		        .attr('class', 'bar')
		        .attr('y', d => nameScale(d.name))
		        .attr('width', d => dataScale(d.value))
		        .attr('height', nameScale.bandwidth())
		        .style('fill', function(d, i) {
		            return color[i % 4] // use colors in sequence
		        });

		    bars
		    	.exit()
		    	.remove();

		    if (!initDone) {
		        // draw axes
		        const xAxis = axisBottom(dataScale);
		        svg
			        .append('g')
			        .attr('class', 'x axis')
			        .attr('transform', `translate(0,${h + margin.bottom / 3})`)
			        .call(xAxis);
		  
		        const yAxis = axisLeft(nameScale).tickSize(0);
		        svg
			        .append('g')
			        .attr('class', 'y axis')
			        .attr('transform', `translate(${-margin.left / 3},0)`)
			        .call(yAxis)

			    finishInit(true);
		    }
		}
	}, [data, config])

	if (!data) {
		return (
			<div> PLACEHOLDER </div>
		);
	}

	// From this point on, rendering is controlled by D3
	return (
		<svg
			className="bar-chart-container"
			width={config.width}
			height={config.height}
			role="img"
			ref={ref}
		/>
	);
}

export const mapStateToProps = (state, props) => {
  return {
  	reduxData: state.warReducer.chartData[props.name || "def"]
  };
};

export const BarChartContainer = connect(mapStateToProps, { requestChartRefresh })(BarChart);
