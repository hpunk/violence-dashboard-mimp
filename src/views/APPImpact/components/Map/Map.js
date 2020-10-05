import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Choropleth from '../../../../charts/Choropleth';


class Map extends Component {
    render() {
        return (
            <React.Fragment>
                <div>Mapa</div>
                <Choropleth
                    width={400}
                    height={400}
                    id={"impact_map"}
                    bubbles={[{long:-13.448,lat: -72.78,name:"Test"}]}
                    provincia={"0301"}
                />
            </React.Fragment>
        );
    }
}
export default withStyles()(Map);