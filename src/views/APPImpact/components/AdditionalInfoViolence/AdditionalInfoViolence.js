import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "react-bootstrap/Card";
import PieChart from '../../../../charts/Pie';
import { Typography } from 'antd';
import { Descriptions } from 'antd';

const { Text } = Typography;

class AdditionalInfoViolence extends Component {
    constructor(props){
        super(props);
        this.state ={
            radius: 210,
        };
    }
    render() {
        const { radius } = this.state;
        return (
            <React.Fragment>
                <Descriptions title="Información Adicional Casos de violencia"></Descriptions>
                <div style={{display:'flex', marginTop:'-20px'}}>
                    <div>
                        <PieChart
                            id={"pie_violence_type_before"}
                            data={[{label:"test1", count:2},{label:"test2",count:7}]}
                            width={radius}
                            height={radius}
                        />
                        <div style={{marginLeft:'60px'}}><Text>Distribución por edades</Text></div>
                    </div>
                    <div style={{marginLeft:"100px"}}>
                        <PieChart
                            id={"pie_violence_type_after"}
                            data={[{label:"test1", count:2},{label:"test5",count:3},{label:"test9",count:2},{label:"test8",count:3}]}
                            width={radius}
                            height={radius}
                        />
                        <div style={{marginLeft:'40px'}}><Text>Distribución por tipo de beneficiario</Text></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles()(AdditionalInfoViolence);