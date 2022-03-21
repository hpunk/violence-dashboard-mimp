import React, {useState} from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
    Spin,
} from 'antd';

import { 
    ButtonLabelWrapper,
} from '../Impact/Impact.styles';

import {InputsCardAPP} from './Evolution.styles';

import moment from 'moment';

import { DEPARTAMENTOS_MANDATORY } from '../../constants/enums';

import {QuestionCircleOutlined} from "@ant-design/icons";

import PropTypes from 'prop-types';

const { Text } = Typography;
const { Option } = Select;


function EvolutionFilter({filter, onSearch, onChange, loading}){
    const [showStateSelector, setShowStateSelector] = useState(filter.filter_by == "PROVINCE");
    const [startLocal,setStartLocal] = useState(filter.startDate);
    const [endLocal,setEndLocal] = useState(filter.endDate);
    const dateFormatList = ['MM/YYYY', 'MM/YYYY'];

    const stateOptions = DEPARTAMENTOS_MANDATORY.map(d => <Option key={d.value}>{d.label}</Option>);

    const changeState = (value) => {
      onChange('state',value);
      onChange('stateLabel',DEPARTAMENTOS_MANDATORY.find(i => i.value == value).label);
    };

    const changeFilterBy = (value) => {
      onChange('filter_by', value);
      setShowStateSelector(value=="PROVINCE")
    }

    const disabledEndDate = current => {
      return (current.diff(startLocal,'months') < 0) || (current.diff(startLocal,'months') >23);
    }

    const disabledDate = current => {
      return current.isBefore(moment('01-01-2017','DD-MM-YYYY')) || current.isAfter(moment('31-12-2020','DD-MM-YYYY'));
    }

    return (
      <React.Fragment>
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <div>
                <Text strong type="primary">Rango de fechas:</Text>
                </div>
                <div>
                <DatePicker 
                  value={startLocal}
                  placeholder={"Mes inicio"}
                  format={dateFormatList}
                  allowClear={false}
                  onChange={e => {
                    setStartLocal(e);
                    if(e.startOf("month").isAfter(endLocal.endOf("month")) || endLocal.diff(e,'months') > 23)
                      setEndLocal(e.endOf("month"));
                    onChange("startDate",e);
                  }} 
                  picker="month"
                  disabledDate={disabledDate}
                />
                <DatePicker 
                  value={endLocal}
                  placeholder={"Mes fin"}
                  format={dateFormatList}
                  allowClear={false}
                  onChange={e => {
                    setEndLocal(e);
                    if(startLocal.startOf("month").isAfter(e.endOf("month")))
                      setStartLocal(e.startOf("month"));
                    onChange("endDate",e);
                  }} 
                  picker="month"
                  disabledDate={disabledEndDate}
                />
                <div class="tooltip" style={{ marginLeft : "10px", marginRight : "10px"}}>
                  <QuestionCircleOutlined />
                  <span class="tooltiptext">Rango de fechas (mes inicio - mes fin) para visualizar los casos de violencia de forma mensual en el Perú</span>
                </div>
                {loading && <Spin size="large" />}
                </div>
              </ButtonLabelWrapper>

              {false && <ButtonLabelWrapper>
                <Text strong type="primary">Filtrar por:</Text>
                <Select defaultValue="Departamento" style={{ width: 120 }} onChange={e => changeFilterBy(e)}>
                  <Option key={"STATE"}>{"Departamento"}</Option>
                  <Option key={"PROVINCE"}>{"Provincia"}</Option>
                </Select>
              </ButtonLabelWrapper>}
              { showStateSelector &&
              <ButtonLabelWrapper>
                <Text strong type="primary">Departamento</Text>
                <Select value={filter.stateLabel} style={{ width: 120 }} onChange={e => changeState(e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              }
            </Space>
          </InputsCardAPP>
        </React.Fragment>
    );
}

EvolutionFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default EvolutionFilter;