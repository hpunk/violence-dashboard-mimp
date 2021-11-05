import React, {useState} from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
} from 'antd';

import { 
    ButtonLabelWrapper,
} from '../Impact/Impact.styles';

import {InputsCardAPP} from './Evolution.styles';

import { DEPARTAMENTOS_MANDATORY } from '../../constants/enums';

import PropTypes from 'prop-types';

const { Text } = Typography;
const { Option } = Select;


function EvolutionFilter({filter, onSearch, onChange}){
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

    return (
      <React.Fragment>
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha inicio:</Text>
                <DatePicker value={startLocal} format={dateFormatList} allowClear={false}
                onChange={e => {
                  setStartLocal(e);
                  onChange('startDate',e);
                  if((endLocal.diff(e,'days') < 0) || (endLocal.diff(e,'years') > 2)){
                    setEndLocal(e);
                    onChange('endDate',e);
                  }
                }
                } />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha fin:</Text>
                <DatePicker disabledDate={disabledEndDate} value={endLocal} format={dateFormatList} onChange={e => {
                      setEndLocal(e);
                      onChange('endDate',e);
                      }} allowClear={false} />
              </ButtonLabelWrapper>
              {false && <ButtonLabelWrapper>
                <Text type="primary">Filtrar por:</Text>
                <Select defaultValue="Departamento" style={{ width: 120 }} onChange={e => changeFilterBy(e)}>
                  <Option key={"STATE"}>{"Departamento"}</Option>
                  <Option key={"PROVINCE"}>{"Provincia"}</Option>
                </Select>
              </ButtonLabelWrapper>}
              { showStateSelector &&
              <ButtonLabelWrapper>
                <Text type="primary">Departamento</Text>
                <Select value={filter.stateLabel} style={{ width: 120 }} onChange={e => changeState(e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              }
              <div style={{marginTop:"25px"}}><button onClick={() => onSearch()}> Buscar </button></div>
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