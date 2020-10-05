import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { DatePicker, Space } from 'antd';
import { Typography } from 'antd';
import { InputNumber } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const { Text } = Typography;
const childrenDep = [];
const childrenProv = [];
const childrenDist = [];

class Filter extends Component {
    constructor(props){
        super(props);
    }

    onChange = () => {
        console.log("aea");
    }


    render() {
        for (let i = 10; i < 36; i++) {
            childrenDep.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
            childrenProv.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
            childrenDist.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        return (
            <React.Fragment>
                <Space direction="horizontal">
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>Fecha inicio APP</Text>
                        </div>
                        <DatePicker
                            id={"fromDateAPP"}
                            name={"fromDateAPP"} 
                            onChange={this.onChange}
                        />
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>Fecha Fin APP</Text>
                        </div>
                        <DatePicker
                            id={"toDateAPP"}
                            name={"toDateAPP"}
                            onChange={this.onChange}
                        />
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>APP en departamento</Text>
                        </div>
                        <Select
                            id={"depSelector"}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                        >
                            {childrenDep}
                        </Select>
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>APP en provincia</Text>
                        </div>
                        <Select
                            id={"depSelector"}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                        >
                            {childrenProv}
                        </Select>
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>APP en distrito</Text>
                        </div>
                        <Select
                            id={"depSelector"}
                            onChange={this.onChange}
                            style={{ width: '100%' }}
                        >
                            {childrenDist}
                        </Select>
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>Violencia días antes</Text>
                        </div>
                        <InputNumber
                            id={"violenceDaysBefore"}
                            name={"violenceDaysBefore"}
                            min={1} 
                            max={60}
                            defaultValue={10}
                            onChange={this.onChange} />
                    </div>
                    <div style={{height:'50px'}}>
                        <div style={{marginBottom:'5px', height:'20px', width:'150px'}}>
                            <Text>Violencia días despues</Text>
                        </div>
                        <InputNumber
                            id={"violenceDaysAfter"}
                            name={"violenceDaysAfter"}
                            min={1} 
                            max={60}
                            defaultValue={10}
                            onChange={this.onChange} />
                    </div>
                </Space>              
            </React.Fragment>
        );
    }
}
export default withStyles()(Filter);