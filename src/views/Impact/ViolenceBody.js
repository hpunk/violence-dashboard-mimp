import React from 'react';
import { 
    Typography,
} from 'antd';

import { PieColors, PieHoverColors } from '../../colors/PieColors';
import { Doughnut,Line } from 'react-chartjs-2';
import { VIOLENCE_TYPES } from '../../constants/enums';

import PropTypes from 'prop-types';
import moment from 'moment';

const { Title } = Typography;

function ViolenceBody({ data, filter }){

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
            if(i<filter.days_before) xLineLabel.push(`${i-filter.days_before}`);
            else if(i>=totalLength-filter.days_after) xLineLabel.push(`${i-totalLength-filter.days_after+1}`);
            else xLineLabel.push("APP");
        }
    }

    return (
        <React.Fragment>
            <div>
                <div style={{ height:"100%", width:"100%"}}>
                    <div style={{height:'20%', width: '60%', marginLeft:'20%', textAlign:'center'}}>
                        <Title level={5}>Casos de violencia antes</Title>
                        <Doughnut
                        options={{
                            responsive: true,
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
                                mode: "nearest",
                                yPadding: 10,
                            },
                        }}
                        data={{
                            datasets: [{
                                data: violenceCountBefore,
                                backgroundColor: PieColors,
                                hoverBackgroundColor: PieHoverColors,
                            }],
                            labels: violenceTypes
                        }}
                        />
                    </div>
                    <div style={{height:'20%', width: '60%', marginLeft:'20%', textAlign:'center'}}>
                        <Title level={5}>Casos de violencia después</Title>
                        <Doughnut 
                        options={{
                            responsive: true,
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
                                mode: "nearest",
                                yPadding: 10,
                            },
                        }}
                        data={{
                            datasets: [{
                                data: violenceCountAfter,
                                backgroundColor: PieColors,
                                hoverBackgroundColor: PieHoverColors,
                            }],
                            labels: violenceTypes
                        }}
                        />
                    </div>
                </div>
                <div style={{height:'400px', width: '98%', maxWidth:"820px", marginTop:"30px", paddingLeft:"3.6%"}}>
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
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: data && data.physicalV ?  data.physicalV : [],
                                    label: 'Física',
                                    borderColor:PieHoverColors[1],
                                    borderWidth: 2,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: data && data.psychologicalV ? data.psychologicalV : [],
                                    label: 'Psicológica',
                                    borderColor: PieHoverColors[2],
                                    borderWidth: 2,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: data && data.sexualV ?  data.sexualV : [],
                                    label: 'Sexual',
                                    borderColor: PieHoverColors[3],
                                    borderWidth: 2,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                            ]
                        }}
                        options={{
                            responsive: true,
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
                                        return `${moment(data.dates[tooltipItem[0].index],'YYYY-MM-DD').format('DD/MM/YYYY')}${data.labels[tooltipItem[0].index]=="APP"?" (APP)":""}`;
                                    }
                                    
                                }
                            },
                            maintainAspectRatio: false,
                            scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                            },

                    }}}/>
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