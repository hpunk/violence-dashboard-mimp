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
                <Text strong type="primary">Departamento</Text>
                <Select dropdownMatchSelectWidth={false} value={filter.stateLabel} style={{ width: 120 }} onChange={e => onChange('state',e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              :
              <ButtonLabelWrapper>
                <Text strong type="primary">Provincia</Text>
                <Select value={filter.provinceLabel} style={{ width: 120 }} onChange={e => onChange('province',e)}>
                  {provinceOptions}
                </Select>
              </ButtonLabelWrapper>
            }

              <ButtonLabelWrapper>
                <Text strong type="primary">Sexo víctimas: </Text>
                <Select value={filter.victim_sex} style={{ width: 120 }} onChange={e => onChange("victim_sex",e)}>
                  <Option key={"man_victim"}>{"Hombre"}</Option>
                  <Option key={"woman_victim"}>{"Mujer"}</Option>
                  <Option key={"total_victim"}>{"Todos"}</Option>
                </Select>
              </ButtonLabelWrapper>

            <ButtonLabelWrapper>
              <Text strong type="primary">Ver casos de violencia por:</Text>
              <Text strong type="secondary">(Máximo 2 a la vez)</Text>
              <Checkbox.Group style={{ width: '100%' }} defaultValue={['violence_types']} onChange={(e)=>{ setSelected(e); onChange("types",e); }}>
                <Row>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold"}} disabled={!filter.types.violence_types && selected.length===2} value="violence_types">Tipos violencia</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold"}} disabled={!filter.types.first_time && selected.length===2} value="first_time">1ra vez agresión</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold"}} disabled={!filter.types.factors && selected.length===2} value="factors">Factores del caso</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold"}} disabled={!filter.types.group_age && selected.length===2} value="group_age">Edad de víctima</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox style={{fontWeight:"bold"}} disabled={!filter.types.relation_vict_aggr && selected.length===2} value="relation_vict_aggr">Vínculo</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </ButtonLabelWrapper>
            <div class="tooltip" style={{ marginLeft : "10px", marginRight : "10px"}}>
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