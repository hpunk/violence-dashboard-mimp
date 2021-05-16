import React, { Component } from 'react';
import AppFilter from './AppFilter';
import ViolenceFilter from './ViolenceFilter';
import ViolenceBody from './ViolenceBody';
import AppBody from './AppBody';
import AppService from '../../services/appService';
import 'antd/dist/antd.css';
import moment from 'moment';

import { 
  AppDataContainer, 
  ViolenceDataContainer, 
  ImpactContainer,
} from './Impact.styles';


class Impact extends Component{
  constructor(props){
    super(props)
    this.state = {
      select_app_mode : true,
      charts_app : false,
      show_violence_charts: false,
      selected_app_index : null,
      selected_app : null,
      chart_type : "a",
      location: "PERÚ",
      date: moment('01/01/2020','DD/MM/YYYY'),
      app_filter : {
        startDate : moment('01/01/2020','DD/MM/YYYY'),
        endDate : moment('01/01/2020','DD/MM/YYYY'),
        state: 0,
        province: 0,
        district: 0,
        stateLabel: "TODOS",
        provinceLabel:"TODOS",
        districtLabel:"TODOS",
      },
      cases_filter : {
        days_before : 7,
        days_after : 7,
        
      },
      pie_chart_data:{
        before : [
          {type: "physical", quantity : 10},
          {type: "sexual", quantity : 20},
          {type: "psychological", quantity : 30},
          {type: "economical", quantity : 15},
        ],
        after : [
          {type: "physical", quantity : 40},
          {type: "sexual", quantity : 2},
          {type: "psychological", quantity : 20},
          {type: "economical", quantity : 25},
        ]
      },
      app_list: [],
      app_assistants: null,
      assistants_chart_data : null,
      line_chart_data : [],
      map_cases_data : [],
    }
    this.appService = new AppService();
  }

  setChartType = (option) => {
    this.setState({ chart_type : option });
  }

  changeSelectedApp = (object) => {
    const { selected_app_index, app_list } = this.state;
    const same_index = selected_app_index === object.index;
    if(selected_app_index !== null)
      app_list[selected_app_index].selected = false;
    if(!same_index)
      app_list[object.index].selected = true;
    this.setState({ selected_app_index : same_index ? null : object.index, app_list, show_violence_charts: false })
  }


  activateAppSearch = () => {
    this.setState({ select_app_mode : true, charts_app : false });
  }

  seeAppCharts = () => {
    this.setState({ select_app_mode : false, charts_app : true })
  }
  
  searchApp = () => {
    const { app_filter,app_list , selected_app_index } = this.state;
    if(selected_app_index !== null )
      app_list[selected_app_index].selected = false;

    const formattedFilter = {
      state : app_filter.state,
      province: app_filter.province,
      district: app_filter.district,
      startDate: app_filter.startDate.format('YYYY-MM-DD'),
      endDate: app_filter.endDate.format('YYYY-MM-DD'),
    };
    this.appService.searchAPP(formattedFilter).then( res => {
      this.setState({selected_app_index : null, charts_app : false, select_app_mode : true, app_list:res.map( (item,index) => this.addTableFields(item,index))});
    })
  }

  componentDidMount(){
    this.loadAPP();
  }
  
  addTableFields = (item,index) => {
    item.index = index;
    item.selected = false;
    return item;
  }

  loadAPP = () => {
    const { app_filter,app_list , selected_app_index } = this.state;
    if(selected_app_index !== null )
      app_list[selected_app_index].selected = false;

    let location = app_filter.stateLabel === 'TODOS' ? 'PERÚ' : app_filter.stateLabel;
    location += app_filter.provinceLabel === 'TODOS' ? "" : `-${app_filter.provinceLabel}`;
    location += app_filter.districtLabel === 'TODOS' ? "" : `-${app_filter.districtLabel}`;

    const formattedFilter = {
      state : app_filter.state,
      province: app_filter.province,
      district: app_filter.district,
      startDate: app_filter.startDate.format('YYYY-MM-DD'),
      endDate: app_filter.endDate.format('YYYY-MM-DD'),
    };
    this.appService.searchAPP(formattedFilter).then( res => {
      this.setState({ 
        selected_app_index : null,
        location,
        charts_app : false,
        select_app_mode : true,
        app_assistants: res.aggregatedAssistants,
        app_list:res.preventiveActions.map( (item,index) => this.addTableFields(item,index)),
        date: app_filter.startDate,
      });
    })
    
  }

  onAPPFilterChange = (field,value) => {
    const { app_filter } = this.state;
    if(field=="startDate" || field == "endDate"){
      app_filter[field] = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
    }
    else {
      app_filter[field] = value;
    }
    this.setState({ app_filter });
  }

  updateViolenceBeforeData = (data) => this.setState({ violence_before : data })

  updateData = () => {
    let { pie_chart_data } = this.state;
    pie_chart_data.before = pie_chart_data.before.map( o => ({ type:o.type , quantity : o.quantity + Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10)}));
    pie_chart_data.after = pie_chart_data.after.map( o => ({ type:o.type , quantity : o.quantity + Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10)}))
    this.setState({pie_chart_data, show_violence_charts:true})
  }

  viewAssistantsSingleApp = (object) => {
    this.setState({ assistants_chart_data : object, select_app_mode : false });
  }

  viewAssistantsTotal = () => {
    const { app_assistants } = this.state;
    this.setState({ assistants_chart_data : app_assistants, select_app_mode : false });
  }

  render(){
    const { pie_chart_data, app_list, selected_app_index, select_app_mode, show_violence_charts,app_filter, assistants_chart_data, chart_type,location, date } = this.state;
    return (
      <ImpactContainer id="impact-container">
        <AppDataContainer id="app-container">
          <AppFilter
            onSearch={this.loadAPP}
            filter={app_filter}
            onChange={this.onAPPFilterChange}
          />
          <AppBody
            chartType={chart_type}
            setChartType={this.setChartType}
            location={location}
            handleViewOne={this.viewAssistantsSingleApp}
            handleViewTotal={this.viewAssistantsTotal}
            tableData={app_list}
            assistantsChartData={assistants_chart_data}
            selectMode={select_app_mode}
            setSelectMode={(value) => this.setState({select_app_mode:value})}
            date={date}
          />
        </AppDataContainer>
        <ViolenceDataContainer id="violence-container">
          <ViolenceFilter
            handleUpdateData={this.updateData}
          />
          <ViolenceBody
            selectedApp={selected_app_index}
            showCharts={show_violence_charts}
            pieData={pie_chart_data}
          />
        </ViolenceDataContainer>
      </ImpactContainer>
    )
  }
}

export default Impact;