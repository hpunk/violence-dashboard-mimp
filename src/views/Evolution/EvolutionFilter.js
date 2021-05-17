import React, {useState} from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
} from 'antd';

import { 
    InputsCardAPP,
    ButtonLabelWrapper,
} from '../Impact/Impact.styles';

import { DEPARTAMENTOS_MANDATORY } from '../../constants/enums';

import PropTypes from 'prop-types';

const { Text } = Typography;
const { Option } = Select;


function EvolutionFilter({filter, onSearch, onChange}){
    const [showStateSelector, setShowStateSelector] = useState(filter.filter_by == "PROVINCE");

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

    return (
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha inicio:</Text>
                <DatePicker value={filter.startDate} format={dateFormatList} onChange={e => onChange('startDate',e)} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha fin:</Text>
                <DatePicker value={filter.endDate} format={dateFormatList} onChange={e => onChange('endDate',e)} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Filtrar por:</Text>
                <Select defaultValue="Departamento" style={{ width: 120 }} onChange={e => changeFilterBy(e)}>
                  <Option key={"STATE"}>{"Departamento"}</Option>
                  <Option key={"PROVINCE"}>{"Provincia"}</Option>
                </Select>
              </ButtonLabelWrapper>
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
    );
}

EvolutionFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default EvolutionFilter;