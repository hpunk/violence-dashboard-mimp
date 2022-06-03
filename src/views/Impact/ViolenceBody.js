import React from 'react';

import { PieHoverColors } from '../../colors/PieColors';
import { Line } from 'react-chartjs-2';
import { VIOLENCE_TYPES } from '../../constants/enums';

import PropTypes from 'prop-types';
import moment from 'moment';

function ViolenceBody({ data, filter, appData }){
    console.log("el appData",appData);
    const sumXFirstValues = (array, x) =>{
        let sum = 0;
        for(let i = 0; i < x; i++){
            sum += array[i];
        }
        return sum;
    }

    const sumXLastValues = (array, x) =>{
        let sum = 0;
        for(let i = 0; i < x; i++){
            sum += array[array.length-1-i];
        }
        return sum;
    }

    let violenceTypes = [];
    let violenceCountBefore = [];
    let violenceCountAfter = [];
    const totalLength = data && data.psychologicalV ? data.psychologicalV.length : 0;
    const dates = data && data.dates ? data.dates : [];
    let xLineLabel = [];

    if(data){
        violenceTypes.push(VIOLENCE_TYPES.economical);
        violenceTypes.push(VIOLENCE_TYPES.physical);
        violenceTypes.push(VIOLENCE_TYPES.psychological);
        violenceTypes.push(VIOLENCE_TYPES.sexual);

        violenceCountBefore.push(sumXFirstValues(data.economicalV,filter.days_before));
        violenceCountBefore.push(sumXFirstValues(data.physicalV,filter.days_before));
        violenceCountBefore.push(sumXFirstValues(data.psychologicalV,filter.days_before));
        violenceCountBefore.push(sumXFirstValues(data.sexualV,filter.days_before));

        violenceCountAfter.push(sumXLastValues(data.economicalV,filter.days_after));
        violenceCountAfter.push(sumXLastValues(data.physicalV,filter.days_after));
        violenceCountAfter.push(sumXLastValues(data.psychologicalV,filter.days_after));
        violenceCountAfter.push(sumXLastValues(data.sexualV,filter.days_after));

        

        for(let i = 0; i<totalLength; i++){
            xLineLabel.push(`${i+1}`);
        }
    }

    return (
        <React.Fragment>
            <div style={{height:'100%'}}>

                <div style={{height:'48%', width: '98%', maxWidth:"550px", marginTop:"10px", paddingLeft:"3.6%"}}>
                    <Line
                        data={{
                            labels: xLineLabel,
                            dates: dates,
                            datasets: [
                                {
                                    data: appData,
                                    label: 'Acciones Preventivas Promocionales',
                                    borderColor: PieHoverColors[0],
                                    borderWidth: 2,
                                    radius: 1,
                                    backgroundColor: PieHoverColors[0],
                                    fill: false,
                                },
                            ]
                        }}
                        options={{
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Gráfico 1: Cantidad de acciones preventivas registradas en el mes',
                                fontSize: "11"
                            },
                            legend:{
                                labels: {
                                    usePointStyle : true,
                                    fontSize:11,
                                }
                            },
                            interaction: {
                                intersect: false,
                                mode:"nearest"
                            },
                            tooltips: {
                                displayColors: true,
                                titleFontSize: 11,
                                
                                bodyFontSize: 11,
                                xPadding: 10,
                                intersect: false,
                                mode: "index",
                                yPadding: 10,
                                callbacks: {
                                    label: (tooltipItem, data) => {
                                        return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.value}`;
                                    },
                                    title: (tooltipItem,data) => {
                                        return `${moment(data.dates[tooltipItem[0].index],'YYYY-MM-DD').format('DD/MM/YYYY')}`;
                                    }
                                    
                                }
                            },
                            maintainAspectRatio: false,
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
                                        labelString: 'Número de acciones preventivas',
                                        weight : "bold",
                                        fontSize: "13"
                                    }
                                }],
                                xAxes: [{
                                    display: true,
                                    position: 'left',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Días del mes',
                                        weight : "bold",
                                        fontSize: "13"
                                    }
                                }],
                            }
                        }}/>
                </div>
                <div style={{height:'48%', width: '98%', maxWidth:"550px", marginTop:"10px", paddingLeft:"3.6%"}}>
                    <Line
                        data={{
                            labels: xLineLabel,
                            dates: dates,
                            datasets: [
                                {
                                    data: data && data.economicalV ? data.economicalV : [],
                                    label: 'Económica',
                                    borderColor: PieHoverColors[0],
                                    borderWidth: 2,
                                    radius: 1,
                                    backgroundColor: PieHoverColors[0],
                                    fill: false,
                                },
                                {
                                    data: data && data.physicalV ?  data.physicalV : [],
                                    label: 'Física',
                                    borderColor:PieHoverColors[1],
                                    borderWidth: 1,
                                    radius: 1,
                                    backgroundColor: PieHoverColors[1],
                                    fill: false,
                                },
                                {
                                    data: data && data.psychologicalV ? data.psychologicalV : [],
                                    label: 'Psicológica',
                                    borderColor: PieHoverColors[2],
                                    borderWidth: 1,
                                    radius: 1,
                                    backgroundColor: PieHoverColors[2],
                                    fill: false,
                                },
                                {
                                    data: data && data.sexualV ?  data.sexualV : [],
                                    label: 'Sexual',
                                    borderColor: PieHoverColors[3],
                                    borderWidth: 1,
                                    radius: 1,
                                    backgroundColor: PieHoverColors[3],
                                    fill: false,
                                },
                            ]
                        }}
                        options={{
                            responsive: true,
                            legend:{
                                labels: {
                                    usePointStyle : true,
                                    fontSize:11,
                                }
                            },
                            title: {
                                display: true,
                                text: 'Gráfico 2: Cantidad de casos de violencia registrados en el mes por tipo de violencia',
                                fontSize: "11",
                            },
                            interaction: {
                                intersect: false,
                                mode:"nearest"
                            },
                            tooltips: {
                                displayColors: true,
                                titleFontSize: 11,
                                
                                bodyFontSize: 11,
                                xPadding: 10,
                                intersect: false,
                                mode: "index",
                                yPadding: 10,
                                callbacks: {
                                    label: (tooltipItem, data) => {
                                        return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.value}`;
                                    },
                                    title: (tooltipItem,data) => {
                                        return `${moment(data.dates[tooltipItem[0].index],'YYYY-MM-DD').format('DD/MM/YYYY')}${data.labels[tooltipItem[0].index]=="APP"?" (APP)":""}`;
                                    }
                                    
                                }
                            },
                            maintainAspectRatio: false,
                            scales: {
                                
                                yAxes: [{
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Número de casos',
                                        weight : "bold",
                                        fontSize: "13"
                                    },
                                    ticks: {
                                        precision: 0,
                                    },
                                }],
                                xAxes: [{
                                    display: true,
                                    position: 'left',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Días del mes',
                                        weight : "bold",
                                        fontSize: "13"
                                    }
                                }],
                            }

                    }}/>
                </div>
                </div>
        </React.Fragment>
    );
}

ViolenceBody.propTypes = {
    showCharts : PropTypes.bool,
    selectedApp : PropTypes.number,
    pieData : PropTypes.object,
}

export default ViolenceBody;