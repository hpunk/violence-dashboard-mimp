import React from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';


import { 
    Space,
    Table,
} from 'antd';

import {
    bar_data,
    horizontal_bar_data,
} from '../../data_test/datatest';

import {
    InputsCardAPP,
    ButtonWrapper,
} from './Impact.styles';

function AppBody({ selected, tableData, handleSelect, selectMode, setSelectMode }){

    const headers = [
        {
            title: 'Ver',
            dataIndex: 'selected',
            key: 'selected',
            render: (selectedItem,object) => 
                <input
                    type="checkbox" 
                    id={`selected${object.index}`} 
                    name={`selected${object.index}`} 
                    checked={selectedItem} 
                    onClick={() => handleSelect(object)} 
                />,
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Departamento',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Provincia',
            dataIndex: 'province',
            key: 'province',
        },
        {
            title: 'Distrito',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    return (
        <React.Fragment>
            { selectMode ?
                <div>
                <ButtonWrapper>
                    <button onClick={() => setSelectMode(false)} disabled={selected === null}> Ver gráficos </button>
                    {selected === null && <h5 style={{marginTop:"12px", marginLeft: "5px"}}>Seleccionar una APP</h5>}
                </ButtonWrapper>
                <Table 
                    columns={headers} 
                    dataSource={tableData} 
                />
                </div>
                :
                <div>
                    <InputsCardAPP>
                    <button onClick={() => setSelectMode(true)}> Cambiar APP </button>
                    <Space  align={"right"}>
                        <div>Id: 114</div>
                        <div>Departamento: Lima</div>
                        <div>Provincia: Lima</div>
                        <div>Distrito: Lima</div>
                        <div>Tipo Acción Preventiva: Charla en colegio</div>
                    </Space>
                    </InputsCardAPP>
                    <Bar
                        data={bar_data}
                        options={{
                            title: {text :"Por edad de Asistente", display: true}
                        }}
                    />
                    <HorizontalBar
                        data={horizontal_bar_data}
                        options={{
                            title: {text :"Por tipo de Asistente", display: true}
                        }}
                    />
                    
                </div>
            }
        </React.Fragment>
    );
}

AppBody.propTypes = {
    selected : PropTypes.number,
    tableData : PropTypes.array,
    handleSelect : PropTypes.func,
    selectMode : PropTypes.bool,
    setSelectMode : PropTypes.func,
}

export default AppBody;