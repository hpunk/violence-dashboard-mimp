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
const { RangePicker } = DatePicker;

function EvolutionFilter({filter, onSearch, onChange, loading=true}){
    const [showStateSelector, setShowStateSelector] = useState(filter.filter_by == "PROVINCE");
    const [startLocal,setStartLocal] = useState(filter.startDate);
    const [endLocal,setEndLocal] = useState(filter.endDate);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

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
      return (current.diff(startLocal,'days') < 0) || (current.diff(startLocal,'months') >24);
    }

    const disabledDate = current => {
      return current < moment('01-01-2017','DD-MM-YYYY') || current > moment('03-01-2021','DD-MM-YYYY');
    }

    return (
      <React.Fragment>
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text strong type="primary">Rango de fechas:</Text>
                <RangePicker 
                  value={[startLocal,endLocal]}
                  placeholder={["Semana inicio","Semana fin"]}
                  format={dateFormatList}
                  allowClear={false}
                  onChange={e => {
                    setStartLocal(e[0]);
                    setEndLocal(e[1]);
                    onChange("dates",e);
                  }} 
                  picker="week"
                  disabledDate={disabledDate}
                />
                
                <ButtonLabelWrapper>
                <div class="tooltip" style={{width:"50%"}}>
                  <QuestionCircleOutlined />
                  <span class="tooltiptext">Filtros para los casos de violencia y acciones preventivas: Mes y año, departamento, provincia y distrito</span>
                </div>
                  {loading && <Spin size="large" />}
                
                  </ButtonLabelWrapper>
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