import React, { Component } from 'react'
import { PieColors, PieHoverColors } from '../../../colors/PieColors'
import { Doughnut } from 'react-chartjs-2'
import { VIOLENCE_TYPES } from '../../../constants/enums'
class Impact extends Component{
  constructor(props){
    super(props)
    this.state = {
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
      selected_app : {
        date : "",
        code : "",
        total_assistants: 0,
        asisstants_by_age : [],
        assistants_by_type : [],
        type : "",
      },
      line_chart_data : [],
      map_cases_data : [],
    }
  }

  updateViolenceBeforeData = (data) => this.setState({ violence_before : data })

  updateData = () => {
    let { violence_before } = this.state;
    violence_before = violence_before.map( o => ({ type:o.type , quantity : o.quantity + Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10)}))
    this.setState({violence_before})
  }
  render(){
    const { violence_before } = this.state;
    console.log(violence_before)
    return (
      <React.Fragment>
        <div id="cacash">
        <button onClick={this.updateData}> cambiar data </button>
        <Doughnut data={{
          datasets: [{
              data: violence_before.map( vb => vb.quantity ),
              backgroundColor: PieColors,
              hoverBackgroundColor: PieHoverColors,
          }],
          labels: violence_before.map( vb => VIOLENCE_TYPES[vb.type])
      }} />
      </div>
      </React.Fragment>
    )
  }
}

export default Impact