import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';


function SimpleLineChart({data, dates, title }){
    const colors = ['red','green','blue','black','purple','orange','grey'];
    let labels = dates.map((_,i) => i+1);
    return (
      <Line
        data={{
            labels: labels,
            datasets: data.map((e,i) => ({data:e.data, label:e.label, borderColor:colors[i], backgroundColor: colors[i], fill: false, borderWidth:2, radius:1})),
        }}
        options={
          {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              intersect: false,
              mode:"nearest"
            },
            title: {
              display: true,
              text: title,
            },
            legend:{
                labels: {
                    usePointStyle : true,
                    fontSize:11,
                }
            },
            tooltips: {
                displayColors: true,
                titleFontSize: 11,
                backgroundColor: 'black',
                bodyFontSize: 11,
                xPadding: 10,
                intersect: false,
                mode: "nearest",
                yPadding: 10,
                callbacks: {
                    label: (tooltipItem, data) => {
                        return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.value}`;
                    },
                    title: (tooltipItem, _) => {
                        return `${dates[tooltipItem[0].index]}`;
                    }
                    
                }
            },
            stacked: false,
            scales: {
              yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    precision: 0,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Casos de violencia',
                }
              }],
              xAxes: [{
                  display: true,
                  position: 'left',
                  scaleLabel: {
                      display: true,
                      labelString: 'Número de semana en el período seleccionado',
                  }
              }],
            },
          }}
      />
    );
}

SimpleLineChart.propTypes = {
    dates : PropTypes.array,
    data: PropTypes.array,
}

export default SimpleLineChart;