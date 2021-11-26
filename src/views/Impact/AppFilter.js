import React, {useState} from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
    Spin,
    Icon,
} from 'antd';

import { 
    InputsCardAPP,
    ButtonLabelWrapper,
} from './Impact.styles';

import PropTypes from 'prop-types';

import { DEPARTAMENTOS, PROVINCIAS, DISTRITOS} from '../../constants/enums';
import "./styles.css";

import {QuestionCircleOutlined} from "@ant-design/icons";

import "./styles.css";
const { Text } = Typography;
const { Option } = Select;

function AppFilters({filter, loading, onChange}){
    const [startLocal,setStartLocal] = useState(filter.startDate);
    const dateFormatList = ['MM - YYYY', 'MM - YY'];
    const stateOptions = DEPARTAMENTOS.map(d => <Option key={d.value}>{d.label}</Option>);
    const provinceOptions = PROVINCIAS.filter(p => p.state == filter.state || p.value === 0).map(d => <Option key={d.value}>{d.label}</Option>); 
    const districtOptions = DISTRITOS.filter(d => d.province == filter.province || d.value === 0).map(d => <Option key={d.value}>{d.label}</Option>);

    const changeState = (value) => {
        onChange('state',value,DEPARTAMENTOS.find(i => i.value == value).label);
    };

    const changeProvince = (value) => {
        onChange('province',value,PROVINCIAS.find(i => i.value == value).label);
    };

    const changeDistrict = (value) => {
        onChange('district',value,DISTRITOS.find(i => i.value == value).label);
    };

    return (
        <React.Fragment>
          <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text strong type="primary" >Impacto de Acciones Preventivas Promocionales en casos de violencia:</Text> </div>
          <InputsCardAPP>
              <Space  align={"right"}>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Período (mes - año) </Text>
                  <DatePicker value={startLocal} format={dateFormatList}
                    picker={"month"}
                    onChange={e => {setStartLocal(e); onChange('startDate',e);}}
                    allowClear={false}
                    style={{ fontWeight : "bold"}}
                  />
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Departamento</Text>
                  <Select dropdownStyle={{width: "400px", maxWidth: "400px"}} value={filter.stateLabel} style={{ width: 120 }} onChange={e => changeState(e)}>
                    {stateOptions}
                  </Select>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Provincia</Text>
                  <Select value={filter.provinceLabel} style={{ width: 120 }} onChange={e => changeProvince(e)}>
                    {provinceOptions}
                  </Select>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Distrito</Text>
                  <Select value={filter.districtLabel} style={{ width: 120 }} onChange={e => changeDistrict(e)}>
                    {districtOptions}
                  </Select>
                </ButtonLabelWrapper>
                <div class="tooltip">
                  <QuestionCircleOutlined />
                  <span class="tooltiptext">Filtros para los casos de violencia y acciones preventivas: Mes y año, departamento, provincia y distrito</span>
                </div>
                <div style={{marginTop:"15px"}}>
                  {loading && <Spin size="large" />}
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