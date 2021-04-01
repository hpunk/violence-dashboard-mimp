import React, { Component } from 'react';
import { PieColors, PieHoverColors } from '../../colors/PieColors';
import { Doughnut, Bar, HorizontalBar, } from 'react-chartjs-2';
import { VIOLENCE_TYPES } from '../../constants/enums';

import { 
  AppDataContainer, 
  ViolenceDataContainer, 
  ImpactContainer 
} from './Impact.styles';

import { 
  Typography,
  Table,
 } from 'antd';

import {
  AppTableColumns,
} from './ImpactChartUtils';

import 'antd/dist/antd.css';

import AppService from '../../services/appService';

import {
    bar_data,
    horizontal_bar_data,
} from '../../data_test/datatest';

const { Title } = Typography;

class Impact extends Component{
  constructor(props){
    super(props)
    this.state = {
      selected_app_index : null,
      selected_app : null,
      app_filter : {
        start_date : new Date(),
        end_date : new Date(),
      },
      cases_filter : {
        days_before : 7,
        days_after : 7,
      },
      violence_before : [
        {type: "physical", quantity : 10},
        {type: "sexual", quantity : 20},
        {type: "psychological", quantity : 30},
        {type: "economical", quantity : 15},
      ],
      violence_after : [
        {type: "physical", quantity : 10},
        {type: "sexual", quantity : 20},
        {type: "psychological", quantity : 30},
        {type: "economical", quantity : 15},
      ],
      app_list: [],
      line_chart_data : [],
      map_cases_data : [],
    }
    this.appService = new AppService();
  }

  changeSelectedApp = (object) => {
    const { selected_app_index, app_list } = this.state;
    const same_index = selected_app_index === object.index;
    if(selected_app_index !== null)
      app_list[selected_app_index].selected = false;
    if(!same_index)
      app_list[object.index].selected = true;
    this.setState({ selected_app_index : same_index ? null : object.index, app_list })
  }

  componentDidMount(){
    console.log("que fue");
    this.loadAPP();
  }
  
  addTableFields = (item,index) => {
    item.index = index;
    item.selected = false;
    return item;
  }

  loadAPP = () => {
    const data = this.appService.searchAPP().then( res => {
      this.setState({app_list:res.map( (item,index) => this.addTableFields(item,index))});
    })
    
  }

  updateViolenceBeforeData = (data) => this.setState({ violence_before : data })

  updateData = () => {
    let { violence_before } = this.state;
    violence_before = violence_before.map( o => ({ type:o.type , quantity : o.quantity + Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10)}))
    this.setState({violence_before})
  }

  render(){
    const { violence_before, app_list, selected_app_index } = this.state;
    console.log(selected_app_index);
    return (
      <ImpactContainer id="impact-container">
        <AppDataContainer id="app-container">
          <Table 
            columns={AppTableColumns(this.changeSelectedApp)} 
            dataSource={app_list} 
          />
          <Bar
            data={bar_data}
            options={{
              title: {text :"Por edad de Asistente", display: true}
            }}
          />
          <HorizontalBar
            Title={"Por tipo de asistente"}
            data={horizontal_bar_data}
            options={{
              title: {text :"Por tipo de Asistente", display: true}
            }}
          />
        </AppDataContainer>
        <ViolenceDataContainer id="violence-container">
          <button onClick={this.updateData}> cambiar data </button>
          <div style={{display:'flex'}}>
            <div style={{height:'50%', width: '50%', textAlign:'center'}}>
              <Title level={5}>Casos de violencia antes</Title>
              <Doughnut 
                data={{
                  datasets: [{
                      data: violence_before.map( vb => vb.quantity ),
                      backgroundColor: PieColors,
                      hoverBackgroundColor: PieHoverColors,
                  }],
                  labels: violence_before.map( vb => VIOLENCE_TYPES[vb.type])
                }}
              />
            </div>
            <div style={{height:'50%', width: '50%', textAlign:'center'}}>
              <Title level={5}>Casos de violencia después</Title>
              <Doughnut 
                data={{
                  datasets: [{
                      data: violence_before.map( vb => vb.quantity ),
                      backgroundColor: PieColors,
                      hoverBackgroundColor: PieHoverColors,
                  }],
                  labels: violence_before.map( vb => VIOLENCE_TYPES[vb.type])
                }}
              />
            </div>
          </div>
        </ViolenceDataContainer>
        
      </ImpactContainer>
    )
  }
}

export default Impact;