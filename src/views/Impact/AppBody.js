import React,{ useState }  from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

import PropTypes from 'prop-types';


import { 
    Typography,
    Table,
    Radio,
    DatePicker,
    Space,
} from 'antd';

import {
    bar_data,
    horizontal_bar_data,
} from '../../data_test/datatest';

import {
    InputsCardAPP,
    ButtonLabelWrapper,
} from './Impact.styles';

import { APP_TYPE_GROUPS_2017_2018, APP_TYPE_GROUPS_2019_2020, APP_CODES_2017_2018, APP_CODES_2019_2020 } from '../../constants/enums';

const { Text } = Typography;

function AppBody({ location, tableData, handleViewOne, selectMode, setSelectMode, assistantsChartData, chartType, setChartType, date, onChange,filter }){
    const headers = [
        {
            title: '',
            dataIndex: 'selected',
            key: 'selected',
            render: (_,object) => 
                <button
                    id={`view${object.index}`} 
                    name={`view${object.index}`}
                    onClick={() => handleViewOne(object)}
                >
                    Ver asistentes
                </button>,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (_,object) =>  date._i[9] == '7' || date._i[9] == '8' ? APP_CODES_2017_2018.find(d => object.actionType === d.code).value : APP_CODES_2019_2020.find(d => object.actionType === d.code).value,
        },
        {
            title: 'Número',
            dataIndex: 'count',
            key: 'count'
        },
    ];

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const disableDate = current => {
        return (current.diff(filter.startDate,'days') < 0) || (current.diff(filter.endDate,'days') >0);
      }

    const group = assistantsChartData && assistantsChartData.actionType ?
    date._i[9] == '7' || date._i[9] == '8' ? APP_TYPE_GROUPS_2017_2018.find(t => t.code == assistantsChartData.actionType.substr(0,t.code.length)).value : APP_TYPE_GROUPS_2019_2020.find(t => t.code == assistantsChartData.actionType.substr(0,t.code.length)).value
    :
    "Todos";

    const appType = assistantsChartData && assistantsChartData.actionType ? 
    date._i[9] == '7' || date._i[9] == '8' ? APP_CODES_2017_2018.find(d => assistantsChartData.actionType == d.code).value : APP_CODES_2019_2020.find(d => assistantsChartData.actionType == d.code).value
     : 
     "Todos";
    return (
        <React.Fragment>
            <div style={{fontWeight:"bold", marginLeft:"10px"}}><Text type="primary" >{`Datos para : ${location}`}</Text></div>
            { selectMode ?
                <div>
                    <InputsCardAPP>
                    <Space  align={"right"}>
                    <ButtonLabelWrapper>
                    <Text type="primary">Día del mes </Text>
                    <DatePicker
                        disabledDate={disableDate}
                        value={filter.apps_day}
                        format={dateFormatList}
                        onChange={e => {
                            onChange("apps_day",e);
                        }}
                        allowClear={false}
                    />
                    </ButtonLabelWrapper>
                    </Space>
                    <Table 
                        columns={headers} 
                        dataSource={tableData} 
                    />
                    </InputsCardAPP>
                </div>
                :
                <div>
                    <InputsCardAPP>
                        <button onClick={() => {
                            setSelectMode(true);
                            setChartType("a");
                            }}> Volver </button>
                        <div style={{fontWeight:"bold"}}>Grupo Acciones Preventivas Promocionales:</div>
                        <div>{`${group}`}</div>
                        <div style={{fontWeight:"bold"}}>Tipo de Acción Preventiva Promocional: </div>
                        <div>{`${appType}`}</div>
                        <Radio.Group onChange={() => setChartType(chartType==="a"?"b":"a")} defaultValue="a">
                            <Radio.Button value="a">Por edad</Radio.Button>
                            <Radio.Button value="b">Por tipo (Top 10)</Radio.Button>
                        </Radio.Group>
                        { chartType === "a" ?
                            <div style={{height:"700px" , maxWidth:"763px"}}>
                            <HorizontalBar
                                data={bar_data(assistantsChartData)}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                        stacked: true,
                                        },
                                        y: {
                                        stacked: true
                                        },
                                    }
                                }}
                            />
                            </div>
                            :
                            <div style={{height:"700px", maxWidth:"763px"}}>
                            <HorizontalBar
                                data={horizontal_bar_data(assistantsChartData)}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                        stacked: true,
                                        },
                                        y: {
                                        stacked: true
                                        },
                                    }
                                }}
                            />
                            </div>
                        }
                    </InputsCardAPP>
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