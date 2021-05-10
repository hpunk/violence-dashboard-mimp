import React from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
} from 'antd';

import { 
    InputsCardAPP,
    ButtonLabelWrapper,
} from './Impact.styles';

import moment from 'moment';
import PropTypes from 'prop-types';

import { DEPARTAMENTOS, PROVINCIAS, DISTRITOS} from '../../constants/enums';

const { Text } = Typography;
const { Option } = Select;

function AppFilters({filter, onSearch, onChange}){
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const stateOptions = DEPARTAMENTOS.map(d => <Option key={d.value}>{d.label}</Option>);
    const provinceOptions = PROVINCIAS.filter(p => p.state == filter.state).map(d => <Option key={d.value}>{d.label}</Option>); 
    const districtOptions = DISTRITOS.filter(d => d.province == filter.province).map(d => <Option key={d.value}>{d.label}</Option>);

    const changeState = (value) => {
      console.log(value);
        onChange('state',value);
        onChange('stateLabel',DEPARTAMENTOS.find(i => i.value == value).label)
    };

    const changeProvince = (value) => {
        onChange('province',value);
        onChange('provinceLabel',PROVINCIAS.find(i => i.value == value).label)
    };

    const changeDistrict = (value) => {
        onChange('district',value);
        onChange('districtLabel',DISTRITOS.find(i => i.value == value).label)
    };

    return (
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha inicio</Text>
                <DatePicker value={filter.startDate} format={dateFormatList} onChange={e => onChange('startDate',e)}/>
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha fin</Text>
                <DatePicker value={filter.endDate} format={dateFormatList} onChange={e => onChange('endDate',e)}/>
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Departamento</Text>
                <Select value={filter.stateLabel} style={{ width: 120 }} onChange={e => changeState(e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Provincia</Text>
                <Select value={filter.provinceLabel} style={{ width: 120 }} onChange={e => changeProvince(e)}>
                  {provinceOptions}
                </Select>
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Distrito</Text>
                <Select value={filter.districtLabel} style={{ width: 120 }} onChange={e => changeDistrict(e)}>
                  {districtOptions}
                </Select>
              </ButtonLabelWrapper>
              <div style={{marginTop:"25px"}}><button onClick={onSearch}> Buscar </button></div>
            </Space>
          </InputsCardAPP>
    );
}

AppFilters.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default AppFilters;