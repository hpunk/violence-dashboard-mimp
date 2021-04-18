import React from 'react';
import PropTypes from 'prop-types';
import { Line, Utils } from 'react-chartjs-2';


function SimpleLineChart({data, yAxis, xAxis, dates }){
    const colors = ['red','green','blue','black','purple','orange'];
    let labels = dates.map((_,i) => i+1);

    return (
      <Line
        data={{
            labels: labels,
            datasets: data.map((e,i) => ({data:e.data, label:e.label, borderColor:colors[i], backgroundColor: 'transparent', borderWidth:2, radius:2})),
        }}
        options={
          {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: 'HOLAA',
                align: 'start'
              }
            },
            scales: {
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                    drawOnChartArea: false,
                  },
              },
            }
          }
        }
      />
    );
}

SimpleLineChart.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default SimpleLineChart;