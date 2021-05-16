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
} from './Impact.styles';

import PropTypes from 'prop-types';

import { DEPARTAMENTOS, PROVINCIAS, DISTRITOS} from '../../constants/enums';

const { Text } = Typography;
const { Option } = Select;

function AppFilters({filter, onSearch, onChange}){
    const [startLocal,setStartLocal] = useState(filter.startDate);
    const [endLocal,setEndLocal] = useState(filter.endDate);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const stateOptions = DEPARTAMENTOS.map(d => <Option key={d.value}>{d.label}</Option>);
    const provinceOptions = PROVINCIAS.filter(p => p.state == filter.state || p.value === 0).map(d => <Option key={d.value}>{d.label}</Option>); 
    const districtOptions = DISTRITOS.filter(d => d.province == filter.province || d.value === 0).map(d => <Option key={d.value}>{d.label}</Option>);

    const changeState = (value) => {
        onChange('state',value);
        onChange('stateLabel',DEPARTAMENTOS.find(i => i.value == value).label);
        changeProvince(0);
        changeDistrict(0);
    };

    const changeProvince = (value) => {
        onChange('province',value);
        onChange('provinceLabel',PROVINCIAS.find(i => i.value == value).label);
        changeDistrict(0);
    };

    const changeDistrict = (value) => {
        onChange('district',value);
        onChange('districtLabel',DISTRITOS.find(i => i.value == value).label);
    };

    return (
        <React.Fragment>
          <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Acciones Preventivas Promocionales:</Text> </div>
          <InputsCardAPP>
              <Space  align={"right"}>
                <ButtonLabelWrapper>
                  <Text type="primary">Fecha inicio</Text>
                  <DatePicker value={startLocal} format={dateFormatList} onChange={e => setStartLocal(e)} allowClear={false}/>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text type="primary">Fecha fin</Text>
                  <DatePicker value={endLocal} format={dateFormatList} onChange={e => setEndLocal(e)} allowClear={false}/>
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
                <div style={{marginTop:"25px"}}>
                  <button onClick={() =>{
                    onChange('startDate',startLocal);
                    onChange('endDate',endLocal);
                    onSearch();
                  }}> 
                    Buscar 
                  </button>
                </div>
              </Space>
            </InputsCardAPP>
          </React.Fragment>
    );
}

AppFilters.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default AppFilters;