import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Descriptions } from 'antd';
import PieChart from '../../../../charts/Pie';

class EmptyComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const children = this.props.children;
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}
export default withStyles()(EmptyComponent);