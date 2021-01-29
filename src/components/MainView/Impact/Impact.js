import React, { Component } from 'react';

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
      violence_before : {
        physical : 0,
        sexual : 0,
        psychologycal : 0,
        economical : 0,
      },
      violence_after : {
        physical : 0,
        sexual : 0,
        psychologycal : 0,
        economical : 0,
      },
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

  render(){
    const { app_filter } = this.state;
    console.log(app_filter);
    return <h1>IMpact</h1>
  }
}

export default Impact