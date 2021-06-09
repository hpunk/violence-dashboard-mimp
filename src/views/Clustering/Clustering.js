import React, { Component } from 'react';
import ClusteringAlgorithmsFilter from './ClusteringAlgorithmsFilter';
import ClusteringService from '../../services/clusteringService';
import moment from 'moment';
import {
  ClusteringContainer,
  ClusteringFilterContainer,
  ClusteringDataContainer,
  DataFilterContainer,
  AlgorithmContainer ,
  DataCountContainer,
  ClusteringGraphic,
  ClusteringDataDownload,
} from './Clustering.styles';
import { Spin } from 'antd';
import { clusteringAlgorithmsNames } from './utils/utils';
import DataFilter from './DataFilter';
import DataCount from './DataCount';
import DownloadArea from './DownloadArea';

class Clustering extends Component{
  constructor(props){
    super(props)
    this.state = {
      flag_dendro : 0,
      flag_scatter : 0,
      filter : {
        state : 0,
        province : 0,
        district : 0,
        stateLabel: "TODOS",
        provinceLabel:"TODOS",
        districtLabel:"TODOS",
        startDate : moment('01/01/2020','DD/MM/YYYY'),
        endDate : moment('01/01/2020','DD/MM/YYYY'),
        algorithm : 0,
        algorithmLabel : 'K-Medoids',
        k : 3,
        mins : 6,
        eps : 0.1,
        isValid: false,
      },
      clusters:[],
      dendrogram:false,
      count: 0,
      loading: false,
    }
    this.service = new ClusteringService();
  }

  updateState = (i) =>{
    const { flag_dendro, flag_scatter } = this.state;
    if(i===0)
      this.setState({ flag_dendro : flag_dendro + 1 });
    else
      this.setState({ flag_scatter : flag_scatter + 1 });
  }

  countData = () => {
    const { filter } = this.state;
    const formattedFilter = {
      state : filter.state,
      startDate: filter.startDate.format('YYYY-MM-DD'),
      endDate: filter.endDate.format('YYYY-MM-DD'),
      province: filter.province,
      district: filter.district,
    };
    this.setState({ loading: true });
    this.service.countDataToCluster(formattedFilter).then(response => {
      const { filter } = this.state;
      filter.isValid = (response.count >= 50) && (response.count <= 450);
      this.setState({ filter, count : response.count, dendrogram:false, clusters :[], loading: false });
    })
  }

  handleDataFilterChange = (field,value) => {
    const { filter } = this.state;
    if(field=="startDate" || field == "endDate")
      filter[field] = moment(value.format('DD/MM/YYYY'),'DD/MM/YYYY');
    else
      filter[field] = value;
    filter.isValid = false;
    this.setState({ filter });
  }

  handleAlgorithmChange = (field,value) => {
    const { filter } = this.state;
    filter[field] = value;
    if(field==="algorithm"){
      filter.algorithmLabel = clusteringAlgorithmsNames[`${value}`];
      if(value==2)
        filter.k = 0;
      else if(value==0)
        filter.k = 3;
      else if(value==1){
        filter.mins = 6;
        filter.eps = 0.1;
      }
    }
    this.setState({ filter });
  }

  cluster = () => {
    const { filter } = this.state;
    const formattedFilter = {
      state : filter.state,
      startDate: filter.startDate.format('YYYY-MM-DD'),
      endDate: filter.endDate.format('YYYY-MM-DD'),
      province: filter.province,
      district: filter.district,
      k: filter.k,
      mins: filter.mins,
      eps: filter.eps,
      algorithm: filter.algorithm,
    };
    this.setState({ loading : true });
    if(filter.algorithm == 2 && filter.k != 0){
      this.service.getHierarchichalClusters(formattedFilter).then( response => {
        const { flag_scatter } = this.state;
        this.setState({ clusters : response.response, dendrogram : false, flag_scatter : flag_scatter +1, loading : false });
      });
    } else {
      if(filter.algorithm == 2 && filter.k == 0){
        this.service.getClusters(formattedFilter).then( response => {
          const {flag_dendro} = this.state;
          this.setState({ dendrogram : true, clusters : [], flag_dendro: flag_dendro+1, loading : false});
        });
      } else {
        this.service.getClusters(formattedFilter).then( response => {
          const {flag_scatter} = this.state;
          this.setState({ dendrogram : false, clusters:response.response, flag_scatter: flag_scatter+1, loading: false });
        });
      }
    }
  }

  render(){
    const {flag_dendro, flag_scatter ,filter, count, clusters, dendrogram, loading} = this.state;
    console.log("el filter",filter);
    return(
      <ClusteringContainer id="clustering-container">
        <ClusteringFilterContainer id="clustering-filter-container">
          <DataFilterContainer>
            <DataFilter
              filter = {filter}
              onSearch = {this.countData}
              onChange = {(field,value) => this.handleDataFilterChange(field,value)}
              isLoading = {loading}
            />
          </DataFilterContainer>
          <DataCountContainer>
            <DataCount
              count={count}
            />
            {!filter.isValid && <div>Mín. : 50, Máx. : 450</div>}
          </DataCountContainer>
          <AlgorithmContainer>
            <ClusteringAlgorithmsFilter
              filter={filter}
              onCluster = {this.cluster}
              onChange = {(field,value) => this.handleAlgorithmChange(field,value)}
              isLoading = {loading}
            />
          </AlgorithmContainer>
        </ClusteringFilterContainer>
        <ClusteringDataContainer id="clustering-data-container">
          <ClusteringGraphic>
            { loading && <Spin size="large" />}
            { !loading && !dendrogram && clusters.length > 0  &&
              <iframe key={flag_scatter} width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~gustavo_alzamora_2021/11.embed"></iframe>
            }
            { !loading && dendrogram &&
              <iframe key={flag_dendro} width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~gustavo_alzamora_2021/23.embed"></iframe>
            }
          </ClusteringGraphic>
          <ClusteringDataDownload>
            { !loading && clusters.length > 0 && <DownloadArea
              clusters = {clusters}
            />}
          </ClusteringDataDownload>
        </ClusteringDataContainer>
      </ClusteringContainer>
    );
  }
}

export default Clustering