import React, { Component } from 'react';
import { ChartsDataAttributes } from './utils/EvolutionUtils';
import EvolutionFilter from './EvolutionFilter';
import EvolutionChartsFilter from './EvolutionChartsFilter';
import {EvolutionContainer,MapContainer,ChartsContainer, SingleChartContainer,ChartsFilterContainer, MapFilterContainer, ChoroplethContainer, MapCardAPP} from './Evolution.styles';
import './Evolution.styles';
import EvolutionService from '../../services/evolutionService';
import EvolutionChartData from './classes/EvolutionChartData';
import ChartFilterTypes from './classes/ChartFilterTypes';
import { values } from 'd3-collection';
import SimpleLineChart from '../../charts/linechart/SimpleLineChart';
import Map from '../../charts/choropleth/map';
import moment from 'moment';
import { DEPARTAMENTOS_MANDATORY, PROVINCIAS_MANDATORY } from '../../constants/enums';
import {Typography} from 'antd';

const {Text} = Typography;
const PERU_DEPARTAMENTO = require('./peru_departamental_simple.topo.json');


class Evolution extends Component{
  constructor(props){
    super(props)
    this.state = {
        violence_attribute_groups : ['violence_types','first_time','factors','group_age','relation_vict_aggr'],
        groups: {
          violence_types : ['physical_violence','psychological_violence','economical_violence','sexual_violence'],
          first_time : ['first_time'],
          factors : ['aggr_alcohol','aggr_drugs','vict_alcohol','vict_drugs','vict_lgtbi','vict_disability'],
          group_age : ['inf','nin','adol','jov','adul','mayo'],
          relation_vict_aggr: ['family','love','no_relation'],
        },
        labels : {physical_violence: 'V. Física', psychological_violence: 'V. Psicológica', economical_violence: 'V. Económica', sexual_violence: 'V. Sexual'},
        charts_data : null,
        data_filter: {
          startDate : moment('01/01/2020','DD/MM/YYYY'),
          endDate : moment('01/02/2020','DD/MM/YYYY'),
          filter_by: "STATE",
          state: 1,
          stateLabel: "AMAZONAS",
          province: 101,
          provinceLabel: "CHACHAPOYAS",
          victim_sex: "man_victim",
          types: new ChartFilterTypes(),
        },
        charts_to_show : [],
        map_data: [],
        date_map: 1,
    }
    this.evolutionService = new EvolutionService();
  }

  prepareDataForChart = (data) => {

    let temp = new EvolutionChartData();
    for(let i=0; i<data.length; i++){
        temp.dates.push(`${moment(data[i].startDate,'YYYY-MM-DD').format('DD/MM/YYYY')}-${moment(data[i].endDate,'YYYY-MM-DD').format('DD/MM/YYYY')}`);
        for(let j = 0; j<ChartsDataAttributes.length; j++) {
            const attr = ChartsDataAttributes[j];
            temp['man_victim'][attr].data.push(data[i][`man_${attr}`]);
            temp['woman_victim'][attr].data.push(data[i][`woman_${attr}`]);
            temp['total_victim'][attr].data.push(data[i][`man_${attr}`]+data[i][`woman_${attr}`]);
        }
    }

    this.setState({ charts_data : temp.getGrouped() });
  }

  loadChartsData = () => {
      const { data_filter } = this.state;
      const formattedFilter = {
        state : data_filter.state,
        startDate: data_filter.startDate.format('YYYY-MM-DD'),
        endDate: data_filter.endDate.format('YYYY-MM-DD'),
        filterBy: data_filter.filter_by,
        province: data_filter.province,
      };
      this.evolutionService.filterChartData(formattedFilter)
        .then( res => {
            this.prepareDataForChart(res);
        });
  }

  componentDidMount = () => {
      this.loadChartsData();
      this.getMapData();
  }

  handleChartFilterChange = (field, value) =>{
      const { data_filter, charts_to_show } = this.state;
      let new_charts_to_show = [];
      if(field === "types"){
        data_filter.types = new ChartFilterTypes();
        new_charts_to_show = value;
        if(values.length > 0)
            value.forEach(type => data_filter.types[type] = true);
      }
      else{
        data_filter[field] = value;
        new_charts_to_show = charts_to_show;
      }
      if(field==="state"){
        data_filter['stateLabel'] = DEPARTAMENTOS_MANDATORY.find(i => i.value == value).label;
      }
      else if(field==="province"){
        data_filter['provinceLabel'] = PROVINCIAS_MANDATORY.find(i => i.value == value).label;
      }
      this.setState({ data_filter, charts_to_show : new_charts_to_show }, () => {
        if(field ==="state" || field ==="province")
          this.loadChartsData();
      });
  }

  handleMapFilterChange = (field, value) => {
    const { data_filter } = this.state;
    if(field=="startDate" || field == "endDate"){
      data_filter[field] = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
    } else {
      data_filter[field] = value;
      if(field==="filter_by"){
        data_filter['state'] = 1;
        data_filter['province'] = 101;
        data_filter['provinceLabel'] = PROVINCIAS_MANDATORY.find(i => i.value == 101).label;
        data_filter['stateLabel'] = DEPARTAMENTOS_MANDATORY.find(i => i.value == 1).label;
      }
      else if(field==="state"){
        data_filter['province'] = value*100 + 1;
        data_filter['provinceLabel'] = PROVINCIAS_MANDATORY.find(i => i.value == value*100+1).label;
        data_filter['stateLabel'] = DEPARTAMENTOS_MANDATORY.find(i => i.value == value).label;
      }
      else if(field==="province"){
        data_filter[field] = value;
        data_filter['provinceLabel'] = PROVINCIAS_MANDATORY.find(i => i.value == value).label;
      }
    }
    this.setState({ data_filter });
  }

  getMapData = () => {
    const { data_filter } = this.state;
    this.setState({ date_map:1 });
    const formattedFilter = {
      state : data_filter.state,
      startDate: data_filter.startDate.format('YYYY-MM-DD'),
      endDate: data_filter.endDate.format('YYYY-MM-DD'),
      filterBy: data_filter.filter_by,
    };
    this.evolutionService.getMapData(formattedFilter).then( res => {
      this.setState({ map_data : res});
    });
  }
    
  render(){
    const { data_filter, charts_to_show, charts_data, map_data,date_map } = this.state;
    return(
      <EvolutionContainer>
        <MapContainer>
            <MapFilterContainer>
                <EvolutionFilter
                  filter={data_filter}
                  onChange={this.handleMapFilterChange}
                  onSearch={() => {this.getMapData(); this.loadChartsData();}}
                />
            </MapFilterContainer>
            <ChoroplethContainer>
              <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Casos por mes:</Text> </div>
              <MapCardAPP>
              <Map 
                mapJson={PERU_DEPARTAMENTO}
                mapData={map_data}
                date={date_map}
                setDate={(e) => this.setState({date_map:e})}
              />
              </MapCardAPP>
            </ChoroplethContainer>
        </MapContainer>
        <ChartsContainer>
          <ChartsFilterContainer>
            <EvolutionChartsFilter
                filter={data_filter}
                onChange={this.handleChartFilterChange}
            />
          </ChartsFilterContainer>
          <div style={{width:"99%",height:"90%"}}>
          <div style={{"width":"100%", height:"5%","fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Casos por semana:</Text> </div>
          <div style={{width:"100%",height:"95%"}}>
          {
              charts_to_show.map(chart => 
                    <SingleChartContainer key={chart}>
                        <SimpleLineChart 
                          key={chart} 
                          data={charts_data[data_filter.victim_sex][chart]} 
                          dates={charts_data.dates} 
                        />
                    </SingleChartContainer>
              )
          }
          </div>
          </div>
        </ChartsContainer>
      </EvolutionContainer>
    );
  }
}

export default Evolution