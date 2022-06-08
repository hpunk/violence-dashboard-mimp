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
          <div style={{"width":"100%", "fontSize":"15px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Identificación de grupos en casos de violencia:</Text> </div>
          <InputsCardAPP>
              <Space  align={"right"}>
                <ButtonLabelWrapper>
                  <div style={{fontSize:"12px", fontWeight:"bold"}}>Fecha inicio</div>
                  <DatePicker value={startLocal} style={{width:"110px"}} size={"small"} format={dateFormatList} onChange={e => {
                      setStartLocal(e);
                      onChange('startDate',e);
                      if((endLocal.diff(e,'days') < 0) || (Number(endLocal.format('YYYY'))-Number(e.format('YYYY')) > 0)){
                        setEndLocal(e);
                        onChange('endDate',e);
                      }
                      }} allowClear={false}/>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <div style={{fontSize:"12px", fontWeight:"bold"}}>Fecha fin</div>
                  <DatePicker size={"small"} value={endLocal} format={dateFormatList}
                    style={{width:"110px"}}
                    disabledDate={disabledEndDate}
                    onChange={e => {
                      setEndLocal(e);
                      onChange('endDate',e);
                      }} allowClear={false}/>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <div style={{fontSize:"12px", fontWeight:"bold"}}>Departamento</div>
                  <Select dropdownMatchSelectWidth={false} size={"small"} value={filter.stateLabel} style={{ width: "90px" }} onChange={e => changeState(e)}>
                    {stateOptions}
                  </Select>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <div style={{fontSize:"12px", fontWeight:"bold"}}>Provincia</div>
                  <Select dropdownMatchSelectWidth={false} size={"small"} value={filter.provinceLabel} style={{ width: "90px" }} onChange={e => changeProvince(e)}>
                    {provinceOptions}
                  </Select>
                </ButtonLabelWrapper>
                <ButtonLabelWrapper>
                  <div style={{fontSize:"12px", fontWeight:"bold"}}>Distrito</div>
                  <Select dropdownMatchSelectWidth={false} size={"small"} value={filter.districtLabel} style={{ width: "90px" }} onChange={e => changeDistrict(e)}>
                    {districtOptions}
                  </Select>
                </ButtonLabelWrapper>
                <div style={{width:"50px"}}>
                  <div class="tooltip" style={{ marginLeft : "38px"}}>
                    <QuestionCircleOutlined />
                    <span class="tooltiptext">Filtros para seleccionar los casos de violencia con los que se va a llevar a cabo el agrupamiento</span>
                  </div>
                  <Button 
                    onClick={() =>{
                        onSearch();
                    }}
                    type={"primary"}
                    style={{fontWeight:"bold", fontSize:"11px", width:"55px", height:"25px"}}
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