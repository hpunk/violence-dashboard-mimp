import React from 'react';
import { 
    Typography,
} from 'antd';

import { PieColors, PieHoverColors } from '../../colors/PieColors';
import { Doughnut } from 'react-chartjs-2';
import { VIOLENCE_TYPES } from '../../constants/enums';

import PropTypes from 'prop-types';

const { Title } = Typography;

function ViolenceBody({selectedApp, showCharts, pieData}){
    return (
        <React.Fragment>
            { selectedApp !== null && showCharts ?
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
                :
                ""
          }
          { selectedApp !== null && showCharts ?
                <div/>
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