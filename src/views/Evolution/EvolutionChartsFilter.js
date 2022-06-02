import React, { useState } from 'react';
import { 
    Space,
    Select,
    Typography,
    Checkbox,
    Row,
    Col,
} from 'antd';

import { 
    ButtonLabelWrapper,
} from '../Impact/Impact.styles';

import { DEPARTAMENTOS_MANDATORY, PROVINCIAS_MANDATORY } from '../../constants/enums';

import {QuestionCircleOutlined} from "@ant-design/icons";

import {
  EvolutionCardAPP,
} from './Evolution.styles';

import PropTypes from 'prop-types';

const { Text } = Typography;
const { Option } = Select;

function EvolutionChartsFilter({filter, onChange}){
    const [selected, setSelected] = useState([]);
    const stateOptions = DEPARTAMENTOS_MANDATORY.map(d => <Option key={d.value}>{d.label}</Option>);
    const provinceOptions = PROVINCIAS_MANDATORY.filter(p => p.state == filter.state).map(d => <Option key={d.value}>{d.label}</Option>); 
    return (
        <React.Fragment>
          
          <EvolutionCardAPP width={100}>
          <Space  align={"right"}>
          { filter.filter_by === "STATE" ?
              <ButtonLabelWrapper>
                <div style={{fontSize:"12px", fontWeight:"bold"}}>Departamento</div>
                <Select dropdownMatchSelectWidth={false} size={"small"} value={filter.stateLabel} style={{ width: "93px" }} onChange={e => onChange('state',e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              :
              <ButtonLabelWrapper>
                <div style={{fontSize:"12px", fontWeight:"bold"}}>Provincia</div>
                <Select value={filter.provinceLabel} size={"small"} style={{ width: "90px" }} onChange={e => onChange('province',e)}>
                  {provinceOptions}
                </Select>
              </ButtonLabelWrapper>
            }

              <ButtonLabelWrapper>
                <div style={{fontSize:"12px", fontWeight:"bold"}}>Sexo víctimas: </div>
                <Select value={filter.victim_sex} size={"small"} style={{ width: "85px" }} onChange={e => onChange("victim_sex",e)}>
                  <Option key={"man_victim"}>{"Hombre"}</Option>
                  <Option key={"woman_victim"}>{"Mujer"}</Option>
                  <Option key={"total_victim"}>{"Todos"}</Option>
                </Select>
              </ButtonLabelWrapper>

            <ButtonLabelWrapper>
              <div style={{fontSize:"12px", fontWeight:"bold"}}>Ver casos de violencia por: (Máximo 2 a la vez)</div>
              <Checkbox.Group style={{ width: '100%' }} defaultValue={['violence_types']} onChange={(e)=>{ setSelected(e); onChange("types",e); }}>
                <Row>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold", fontSize: "11px", width:"120px"}} disabled={!filter.types.violence_types && selected.length===2} value="violence_types">Tipos violencia</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold", fontSize: "11px", width:"120px"}} disabled={!filter.types.first_time && selected.length===2} value="first_time">1ra vez agresión</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold", fontSize: "11px", width:"130px"}} disabled={!filter.types.factors && selected.length===2} value="factors">Factores de caso</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold", fontSize: "11px"}} disabled={!filter.types.group_age && selected.length===2} value="group_age">Edad de víctima</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold", fontSize: "11px"}} disabled={!filter.types.relation_vict_aggr && selected.length===2} value="relation_vict_aggr">Vínculo</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </ButtonLabelWrapper>
            <div class="tooltip" style={{ marginRight : "1px"}}>
              <QuestionCircleOutlined />
              <span style={{left:"-200px", position:"absolute"}} class="tooltiptext">Filtros para visualizar los casos de violencia de forma semanal para un departamento específico</span>
            </div>
          </Space>
        </EvolutionCardAPP>
      </React.Fragment>
    );
}

EvolutionChartsFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default EvolutionChartsFilter;