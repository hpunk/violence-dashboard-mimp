import React from 'react';
import PropTypes from 'prop-types';
import { Line, Utils } from 'react-chartjs-2';


function SimpleLineChart({data, yAxis, xAxis, dates }){
    const colors = ['red','green','blue','black','purple','orange','grey'];
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
              intersect: false,
              mode:"nearest"
            },
            tooltips: {
                displayColors: true,
                titleFontSize: 14,
                
                bodyFontSize: 14,
                xPadding: 10,
                intersect: false,
                mode: "index",
                yPadding: 10,
                callbacks: {
                    label: (tooltipItem, data) => {
                        return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.value}`;
                    },
                    title: (tooltipItem,data) => {
                        return `${dates[tooltipItem[0].index]}`;
                    }
                    
                }
            },
            stacked: false,
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