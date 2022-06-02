import React,{ useState }  from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

import PropTypes from 'prop-types';

import {QuestionCircleOutlined} from "@ant-design/icons";
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
import "./styles.css";
const { Text } = Typography;

function AppBody({ location, tableData, handleViewOne, selectMode, setSelectMode, assistantsChartData, chartType, setChartType, date, onChange,filter }){
    const headers = [
        {
            title: '',
            dataIndex: 'selected',
            key: 'selected',
            render: (_,object) => 
                <div style={{"max-width":"80.57px"}}>
                <button
                    style={{"font-weight": "bold"}}
                    id={`view${object.index}`} 
                    name={`view${object.index}`}
                    onClick={() => handleViewOne(object)}
                    style={{fontSize: "11px", fontWeight:"bold"}}
                >
                    Ver asistentes
                </button>
                </div>,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (_,object) =>  <div style={{fontSize:"11px", fontWeight:"bold"}}>{date._i[9] == '7' || date._i[9] == '8' ? APP_CODES_2017_2018.find(d => object.actionType === d.code).value : APP_CODES_2019_2020.find(d => object.actionType === d.code).value}</div>,
        },
        {
            title: 'Cantidad',
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
            { selectMode ?
                <div>
                    <InputsCardAPP>
                    <Space  align={"right"}>
                    <ButtonLabelWrapper>
                    <div style={{fontWeight:"bold", fontSize:"12px"}}>{`Acciones preventivas llevadas a cabo en ${location}`}</div>
                    <div style={{fontWeight:"bold", fontSize:"12px"}}>el día 
                        <DatePicker
                            disabledDate={disableDate}
                            value={filter.apps_day}
                            format={dateFormatList}
                            style={{marginRight:"30px", fontSize:"14px"}}
                            onChange={e => {
                                onChange("apps_day",e);
                            }}
                            allowClear={false}
                        />
                        <div class="tooltip">
                          <QuestionCircleOutlined />
                          <span class="tooltiptext">Detalle de acciones preventivas llevadas a cabo en un día específico del mes (Ver Gráfico 1 al lado derecho)</span>
                        </div>
                    </div>
                    </ButtonLabelWrapper>

                    </Space>
                    <Table 
                        size="small"
                        scroll={{
                            y: "480px"
                        }}
                        columns={headers} 
                        dataSource={tableData} 
                    />
                    </InputsCardAPP>
                </div>
                :
                <div>
                    <InputsCardAPP>
                        <button 
                            onClick={() => {
                                setSelectMode(true);
                                setChartType("a");
                            }}
                            style={{fontSize:"12px", fontWeight:"bold"}}
                        > Volver a acciones preventivas</button>
                        <div style={{fontWeight:"bold", fontSize:"13px"}}>Grupo Acciones Preventivas Promocionales:</div>
                        <div style={{ fontSize:"13px"}}>{`${group}`}</div>
                        <div style={{fontWeight:"bold", fontSize:"13px"}}>Tipo de Acción Preventiva Promocional: </div>
                        <div style={{ fontSize:"13px"}}>{`${appType}`}</div>
                        <Radio.Group size={"small"} onChange={() => setChartType(chartType==="a"?"b":"a")} defaultValue="a">
                            <Radio.Button value="a">Por edad</Radio.Button>
                            <Radio.Button value="b">Por tipo (Top 10)</Radio.Button>
                        </Radio.Group>
                        { chartType === "a" ?
                            <div style={{height:"450px" , maxWidth:"500px"}}>
                            <HorizontalBar
                                data={bar_data(assistantsChartData)}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        xAxes: [{
                                            display: true,
                                            position: 'left',
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Cantidad asistentes',
                                                weight : "bold",
                                                fontSize: "14"
                                            }
                                        }],
                                    }
                                }}
                            />
                            </div>
                            :
                            <div style={{height:"450px", maxWidth:"500px"}}>
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