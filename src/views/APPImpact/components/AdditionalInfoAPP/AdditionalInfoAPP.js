import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Descriptions } from 'antd';
import PieChart from '../../../../charts/Pie';
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
                    <div>
                        <PieChart
                            id={"pie_app_edad"}
                            data={[{label:"test1", count:2},{label:"test2",count:7}]}
                            width={260}
                            height={260}
                        />
                        <div style={{marginLeft:'60px'}}><Text>Distribución por edades</Text></div>
                    </div>
                    <div style={{marginLeft:"100px"}}>
                        <PieChart
                            id={"pie_app_tipo"}
                            data={[{label:"test1", count:2},{label:"test5",count:3},{label:"test9",count:2},{label:"test8",count:3},{label:"test7",count:3},{label:"test4",count:3},{label:"test11",count:3},{label:"test12",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3},{label:"test5",count:3}]}
                            width={260}
                            height={260}
                        />
                        <div style={{marginLeft:'40px'}}><Text>Distribución por tipo de beneficiario</Text></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles()(AdditionalInfoAPP);