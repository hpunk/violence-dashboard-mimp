import React, {useState} from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
    Button
} from 'antd';

import { 
    InputsCardAPP,
    ButtonLabelWrapper,
} from './Clustering.styles';

import {QuestionCircleOutlined} from "@ant-design/icons";

import PropTypes from 'prop-types';

import { DEPARTAMENTOS, PROVINCIAS, DISTRITOS} from '../../constants/enums';

const { Text } = Typography;
const { Option } = Select;

function DataFilter({filter, onSearch, onChange, isLoading}){
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

    const disabledEndDate = current => {
      return (current.diff(startLocal,'days') < 0) ||  Number(current.format('YYYY'))-Number(startLocal.format('YYYY')) != 0;
    }

    return (
        <React.Fragment>
          <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Grupos dentro de casos de violencia:</Text> </div>
          <InputsCardAPP>
              <Space  align={"right"}>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Fecha inicio</Text>
                  <DatePicker value={startLocal} format={dateFormatList} onChange={e => {
                      setStartLocal(e);
                      onChange('startDate',e);
                      if((endLocal.diff(e,'days') < 0) || (Number(endLocal.format('YYYY'))-Number(e.format('YYYY')) > 0)){
                        setEndLocal(e);
                        onChange('endDate',e);
                      }
                      }} allowClear={false}/>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Fecha fin</Text>
                  <DatePicker value={endLocal} format={dateFormatList} 
                    disabledDate={disabledEndDate}
                    onChange={e => {
                      setEndLocal(e);
                      onChange('endDate',e);
                      }} allowClear={false}/>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <Text strong type="primary">Departamento</Text>
                  <Select value={filter.stateLabel} style={{ width: 120 }} onChange={e => changeState(e)}>
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
                <div >
                  <div class="tooltip" style={{ marginLeft : "45px"}}>
                    <QuestionCircleOutlined />
                    <span class="tooltiptext">Filtros para seleccionar los casos de violencia con los que se va a llevar a cabo el agrupamiento</span>
                  </div>
                  <Button 
                    onClick={() =>{
                        onSearch();
                    }}
                    type={"primary"}
                    style={{fontWeight:"bold"}}
                    disabled={isLoading}
                  > 
                    Filtrar 
                  </Button>
                </div>
              </Space>
            </InputsCardAPP>
          </React.Fragment>
    );
}

DataFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default DataFilter;