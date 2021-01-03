import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Descriptions } from 'antd';
import GroupedBarChart from '../../../../charts/GroupedBarChart';
import { Typography } from 'antd';


const { Text } = Typography;

class AdditionalInfoAPP extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Descriptions title="Información Adicional APP">
                    <Descriptions.Item label="Tipo">Charla en colegio</Descriptions.Item>
                    <Descriptions.Item label="CEM">Zarumilla</Descriptions.Item>
                    <Descriptions.Item label="Total beneficiados">120</Descriptions.Item>
                </Descriptions>
                <div style={{display:'flex'}}>
                    <GroupedBarChart 
                        id={'barchart_impact'}
                        width={500}
                        height={260}
                        data = {[
                            {
                                'group': 'grupo a',
                                'data' : {
                                    'M' : 12,
                                    'F' : 20
                                }
                            },
                            {
                                'group': 'grupo b',
                                'data' : {
                                    'M' : 10,
                                    'F' : 5
                                }
                            }
                        ]}
                        subgroups={['M','F']}
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles()(AdditionalInfoAPP);