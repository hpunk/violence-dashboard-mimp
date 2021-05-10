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

import { DEPARTAMENTOS, PROVINCIAS, DISTRITOS, APP_CODES_2017_2018, APP_CODES_2019_2020 } from '../../constants/enums';

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
            title: 'CEM organizador',
            dataIndex: 'cemcode',
            key: 'cemcode',
        },
        {
            title: 'Ubigeo de APP',
            dataIndex: 'state',
            key: 'state',
            render: (_,object) => DEPARTAMENTOS.find(d => object.stateCode == d.value).label +"-"+PROVINCIAS.find(d => object.provinceCode == d.value).label+"-"+DISTRITOS.find(d => object.districtCode == d.value).label,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (_,object) => object.startDate['3'] == '7' || object.startDate['3'] == '8' ? APP_CODES_2017_2018.find(d => object.actionCode == d.code).value : APP_CODES_2019_2020.find(d => object.actionCode == d.code).value,
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