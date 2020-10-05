import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Table } from 'antd';

class List extends Component {
    
    rowSelection = () => {

    }

    render() {
        const columns = [
            {
                title: 'Departamento',
                dataIndex: 'departamento',
            },
            {
                title: 'Provincia',
                dataIndex: 'provincia',
            },
            {
                title: 'Distrito',
                dataIndex: 'distrito',
            },
            {
                title: 'Tipo',
                dataIndex: 'tipo',
            },
            {
                title: 'Fecha',
                dataIndex: 'fecha',
            },
          ];
        
        const data = [];

        return (
            <React.Fragment>
                <Table rowSelection={this.rowSelection} columns={columns} dataSource={data} />
            </React.Fragment>
        );
    }
}
export default withStyles()(List);