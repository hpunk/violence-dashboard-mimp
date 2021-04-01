import React, { useRef, useState, useEffect } from 'react';
import ViolenceTypesBarChart from './ViolenceTypesBarChart';

const ViolenceTypesWrapper = ({ data }) => {
	const chartArea = useRef(null);
	const [chart, setChart] = useState(null);

	useEffect(() => {
		if (!chart) {
			setChart(new ViolenceTypesBarChart(chartArea.current, data));
		}
		else {
			chart.update(data);
		}
	}, [chart, data]);

	return (
		<div className="impact-violence-types" ref={chartArea}></div>
	)
}

export default ViolenceTypesWrapper;