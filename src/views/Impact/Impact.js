import React, { Component } from 'react';
import AppFilter from './AppFilter';
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
        endDate : moment('31/01/2020','DD/MM/YYYY'),
        state: 0,
        province: 0,
        district: 0,
        stateLabel: "TODOS",
        provinceLabel:"TODOS",
        districtLabel:"TODOS",
        apps_day: moment('01/01/2020','DD/MM/YYYY'),
        index_apps_day: 0,
      },
      cases_filter : {
        days_before : 0,
        days_after : 0,
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
      day_apps : moment('01/01/2020','DD/MM/YYYY'),
      app_per_day : null,
      app_chart_data : null,
      app_list: null,
      app_assistants: null,
      assistants_chart_data : null,
      line_chart_data : null,
      map_cases_data : [],
      loading_app: false,
      loading_violence: false,
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

  componentDidMount(){
    this.loadAPP();
    this.getViolenceData();
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
    location = (app_filter.provinceLabel === 'TODOS' ? "" : `${app_filter.provinceLabel}-`) + location;
    location = (app_filter.districtLabel === 'TODOS' ? "" : `${app_filter.districtLabel}-`) + location;

    const formattedFilter = {
      state : app_filter.state,
      province: app_filter.province,
      district: app_filter.district,
      startDate: app_filter.startDate.format('YYYY-MM-DD'),
      endDate: app_filter.endDate.format('YYYY-MM-DD'),
    };
    this.setState({loading_app:true});
    this.appService.getPreventiveActionsPerDay(formattedFilter).then( res => {
      this.setState({ 
        app_per_day: res,
        selected_app_index : null,
        location,
        charts_app : false,
        select_app_mode : true,
        //app_assistants: res.aggregatedAssistants,
        app_list:res[0].preventiveActions.map( (item,index) => this.addTableFields(item,index)),
        date: app_filter.startDate,
        loading_app:false,
      }, () => this.getViolenceData());
    })
    
  }

  onAPPFilterChange = (field,value,label) => {
    const { app_filter, app_per_day } = this.state;
    if(field=="startDate"){
      app_filter[field] = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
      app_filter.endDate = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY').add(1,"month").subtract(1,"days");
      app_filter.apps_day = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
      app_filter.index_apps_day = 0;
      this.setState({ app_filter, day_apps: app_filter.startDate, app_list:[] }, () => {this.loadAPP();});
    } else if(field == "apps_day"){
      app_filter.index_apps_day = value.diff(app_filter.startDate,"days");
      app_filter.apps_day = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
      this.setState({ app_filter, app_list : app_per_day[app_filter.index_apps_day].preventiveActions.map( (item,index) => this.addTableFields(item,index)),});
    }
    else {
      app_filter[field] = value;
      app_filter.apps_day = app_filter.startDate;
      app_filter.index_apps_day = 0;
      if(field == "district"){
        app_filter.districtLabel = label;
      } else if(field == "province"){
        app_filter.provinceLabel = label;
        app_filter.district = 0;
        app_filter.districtLabel = "TODOS";
      } else {
        app_filter.stateLabel = label;
        app_filter.district = 0;
        app_filter.districtLabel = "TODOS";
        app_filter.province = 0;
        app_filter.provinceLabel = "TODOS";
      }
      this.setState({ app_filter }, () => {this.loadAPP();});
    }
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

  getViolenceData = () => {
    const { app_filter, cases_filter } = this.state;
    const formattedFilter = {
      state : app_filter.state,
      province: app_filter.province,
      district: app_filter.district,
      appDateStart: app_filter.startDate.format('YYYY-MM-DD'),
      appDateEnd: app_filter.endDate.format('YYYY-MM-DD'),
      daysBefore: cases_filter.days_before,
      daysAfter: cases_filter.days_after,
    };
    this.setState({loading_violence:true});
    this.appService.getViolenceData(formattedFilter).then( res => {
      this.setState({ line_chart_data: res, loading_violence:false });
    });
  }

  onViolenceFilterChange = (field,value) => {
    const { cases_filter } = this.state;
    cases_filter[field] = value;
    this.setState({ cases_filter }, () => this.getViolenceData());
  }

  render(){
    const { line_chart_data, app_list, select_app_mode,app_filter, assistants_chart_data, 
      chart_type,location, date, cases_filter, day_apps, app_per_day, loading_app, loading_violence } = this.state;

    const appLineChartData = app_per_day && app_per_day.length > 0 ? app_per_day.map(day => day.count) : [];
    return (
      <ImpactContainer id="impact-container">
        <AppDataContainer id="app-container">
          <AppFilter
            onSearch={this.loadAPP}
            filter={app_filter}
            onChange={this.onAPPFilterChange}
            loading={loading_violence || loading_app}
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
            dayApps={day_apps}
            filter={app_filter}
            onChange={this.onAPPFilterChange}
          />
          
          
        </AppDataContainer>
        <ViolenceDataContainer id="violence-container">

          <ViolenceBody
            filter={cases_filter}
            data={line_chart_data}
            appData={appLineChartData}
          />
          
        </ViolenceDataContainer>
      </ImpactContainer>
    )
  }
}

export default Impact;