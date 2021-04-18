import React, { Component } from 'react';
import ClusteringAlgorithmsFilter from './ClusteringAlgorithmsFilter';
import ClusteringDataFilter from './ClusteringDataFilter';

class Clustering extends Component{
  constructor(props){
    super(props)
    this.state = {
      flag : 0,
    } 
  }

  updateState = () =>{
    const { flag } = this.state;
    this.setState({ flag : flag + 1 });
  }

  render(){
    const {flag} = this.state;
    console.log(flag);
    return(
      <React.Fragment>
        <ClusteringDataFilter />
        <ClusteringAlgorithmsFilter />
        {
        //<button onClick={this.updateState}>
        //  Actualizar
        //</button>
        }
        <iframe key={flag} width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~gustavo_alzamora_2021/3.embed"></iframe>
      </React.Fragment>
    );
  }
}

export default Clustering