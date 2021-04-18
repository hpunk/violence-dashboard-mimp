import React from 'react';
import { 
    Typography,
} from 'antd';

import { PieColors, PieHoverColors } from '../../colors/PieColors';
import { Doughnut,Line } from 'react-chartjs-2';
import { VIOLENCE_TYPES } from '../../constants/enums';

import PropTypes from 'prop-types';

const { Title } = Typography;

function ViolenceBody({selectedApp, showCharts, pieData}){
    return (
        <React.Fragment>
            { selectedApp !== null && showCharts ?
            <div>
                <div style={{display:'flex'}}>
                    <div style={{height:'50%', width: '50%', textAlign:'center'}}>
                        <Title level={5}>Casos de violencia antes</Title>
                        <Doughnut 
                        data={{
                            datasets: [{
                                data: pieData.before.map( vb => vb.quantity ),
                                backgroundColor: PieColors,
                                hoverBackgroundColor: PieHoverColors,
                            }],
                            labels: pieData.before.map( vb => VIOLENCE_TYPES[vb.type])
                        }}
                        />
                    </div>
                    <div style={{height:'50%', width: '50%', textAlign:'center'}}>
                        <Title level={5}>Casos de violencia después</Title>
                        <Doughnut 
                        data={{
                            datasets: [{
                                data: pieData.after.map( vb => vb.quantity ),
                                backgroundColor: PieColors,
                                hoverBackgroundColor: PieHoverColors,
                            }],
                            labels: pieData.after.map( vb => VIOLENCE_TYPES[vb.type])
                        }}
                        />
                    </div>
                </div>
                <div style={{height:'90%', width: '80%', marginTop:"30px", paddingLeft:"200px"}}>
                    <Line
                        data={{
                            labels: ['-5','-4','-3','-2','-1','APP','1','2','3','4','5'],
                            datasets: [
                                {
                                    data: [80, 70, 90, 70, 90, 40, 30, 70, 80, 90, 70],
                                    label: 'V. Física',
                                    borderColor:'red',
                                    borderWidth: 1,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: [40, 20, 30, 12, 32, 63, 21, 34, 68, 24, 46],
                                    label: 'V. Sexual',
                                    borderColor:'green',
                                    borderWidth: 1,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: [10, 20, 30, 40, 50, 10, 70, 90, 50, 50, 40],
                                    label: 'V. Económica',
                                    borderColor:'blue',
                                    borderWidth: 1,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                },
                                {
                                    data: [50, 10, 70, 90, 60, 50, 40, 10, 20, 30, 50],
                                    label: 'V. Psicológica',
                                    borderColor:'purple',
                                    borderWidth: 1,
                                    radius: 2,
                                    backgroundColor: 'transparent',
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            interaction: {
                            mode: 'index',
                            intersect: false,
                            },
                            stacked: false,
                            plugins: {
                            title: {
                                display: true,
                                text: 'Chart.js Line Chart - Multi Axis'
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

                                // grid line settings
                                grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                                },
                            },
                    }}}/>
                </div>
                </div>
                :
                ""
          }
        </React.Fragment>
    );
}

ViolenceBody.propTypes = {
    showCharts : PropTypes.bool,
    selectedApp : PropTypes.number,
    pieData : PropTypes.object,
}

export default ViolenceBody;