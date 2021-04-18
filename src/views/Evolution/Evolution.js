import React, { Component } from 'react';
import { ChartsDataAttributes } from './utils/EvolutionUtils';
import EvolutionFilter from './EvolutionFilter';
import EvolutionChartsFilter from './EvolutionChartsFilter';
import {EvolutionContainer,MapContainer,ChartsContainer, SingleChartContainer,ChartsFilterContainer, MapFilterContainer} from './Evolution.styles';
import './Evolution.styles';
import EvolutionService from '../../services/evolutionService';
import EvolutionChartData from './classes/EvolutionChartData';
import ChartFilterTypes from './classes/ChartFilterTypes';
import { values } from 'd3-collection';
import SimpleLineChart from '../../charts/linechart/SimpleLineChart';


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
            start_date : "",
            end_date : "",
            filter_by: "",
            state: "",
        },
        chart_filter: {
            selected_place: "",
            victim_sex: "man_victim",
            types: new ChartFilterTypes(),
        },
        charts_to_show : [],
    }
    this.evolutionService = new EvolutionService();
  }

  prepareDataForChart = (data) => {

    let temp = new EvolutionChartData();
    for(let i=0; i<data.length; i++){
        temp.dates.push(data[i].date);
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
      const { filter } = this.state;
      this.evolutionService.filterChartData(filter)
        .then( res => {
            this.prepareDataForChart(res);
        });
  }

  componentDidMount = () => {
      this.loadChartsData();
  }

  handleChartFilterChange = (field, value) =>{
      const { chart_filter } = this.state;
      let new_charts_to_show = null;
      if(field === "types"){
        chart_filter.types = new ChartFilterTypes();
        new_charts_to_show = value;
        if(values.length > 0)
            value.forEach(type => chart_filter.types[type] = true);
      }

      this.setState({ chart_filter, charts_to_show : new_charts_to_show });
  }
    
  render(){
    const { chart_filter, charts_to_show, charts_data } = this.state;
    console.log("el groupped chart ",charts_data);

    return(
      <EvolutionContainer>
        <MapContainer>
            <MapFilterContainer>
                <EvolutionFilter />
            </MapFilterContainer>
        </MapContainer>
        <ChartsContainer>
          <ChartsFilterContainer>
            <EvolutionChartsFilter
                filter={chart_filter}
                onChange={this.handleChartFilterChange}
            />
          </ChartsFilterContainer>
          {
              charts_to_show.map(chart => 
                    <SingleChartContainer key={chart}>
                        <SimpleLineChart key={chart} data={charts_data[chart_filter.victim_sex][chart]} dates={charts_data.dates} />
                    </SingleChartContainer>
              )
          }
        </ChartsContainer>
      </EvolutionContainer>
    );
  }
}

export default Evolution