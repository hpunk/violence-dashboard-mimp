import React, { Component } from 'react';
import draw from './vis';

export default class GroupedBarChart extends Component {

    componentDidMount() {
        draw(this.props);
    }

    componentDidUpdate() {
        draw(this.props);
    }

    render() {
        return (
            <div className={this.props.id}/>
        )
    }
}