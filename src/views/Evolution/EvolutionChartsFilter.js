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
          <EvolutionCardAPP width={20}>
            <Space  align={"right"}>
            { filter.filter_by === "STATE" ?
              <ButtonLabelWrapper>
                <Text type="primary">Departamento</Text>
                <Select value={filter.stateLabel} style={{ width: 120 }} onChange={e => onChange('state',e)}>
                  {stateOptions}
                </Select>
              </ButtonLabelWrapper>
              :
              <ButtonLabelWrapper>
                <Text type="primary">Provincia</Text>
                <Select value={filter.provinceLabel} style={{ width: 120 }} onChange={e => onChange('province',e)}>
                  {provinceOptions}
                </Select>
              </ButtonLabelWrapper>
            }
            </Space>
          </EvolutionCardAPP>
          <EvolutionCardAPP width={25}>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Sexo víctimas: </Text>
                <Select value={filter.victim_sex} style={{ width: 120 }} onChange={e => onChange("victim_sex",e)}>
                  <Option key={"man_victim"}>{"Hombre"}</Option>
                  <Option key={"woman_victim"}>{"Mujer"}</Option>
                </Select>
              </ButtonLabelWrapper>
            </Space>
          </EvolutionCardAPP>
          <EvolutionCardAPP width={50}>
          <Space  align={"right"}>
            <ButtonLabelWrapper>
              <Text type="primary">Características: </Text>
              <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>{ setSelected(e); onChange("types",e); }}>
                <Row>
                  <Col span={8}>
                    <Checkbox  disabled={!filter.types.violence_types && selected.length===3} value="violence_types">Tipos violencia</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled={!filter.types.first_time && selected.length===3} value="first_time">1° vez</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled={!filter.types.factors && selected.length===3} value="factors">Factores</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled={!filter.types.group_age && selected.length===3} value="group_age">Edad</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox disabled={!filter.types.relation_vict_aggr && selected.length===3} value="relation_vict_aggr">Vínculo</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </ButtonLabelWrapper>
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