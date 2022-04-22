import React from 'react';
import { 
    Space,
    Select,
    Typography,
    Button,
    InputNumber,
} from 'antd';

import { 
    InputsCardAlgorithm,
    ButtonLabelWrapper,
} from './Clustering.styles';

import PropTypes from 'prop-types';

const { Text } = Typography;
const {Option} = Select;

function ClusteringAlgorithmsFilter({filter, onCluster, onChange, isLoading}){
    let kOptions = [1,2,3,4,5,6,7,8];
    kOptions = kOptions.map(i => <Option key={i}>{i}</Option>)
    
    return (
        <div>
          <div style={{"width":"90%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Método para encontrar grupos:</Text> </div>
          <InputsCardAlgorithm>
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <Text strong type="primary">Algoritmo</Text>
                  <Select value={filter.algorithmLabel} style={{ width: 120 }} onChange={e => onChange('algorithm',e)}>
                    <Option key={0}>{'K-Medoids'}</Option>
                    <Option key={1}>{'DBSCAN'}</Option>
                    <Option key={2}>{'Linkage'}</Option>
                  </Select>
                </ButtonLabelWrapper>
                {
                  filter.algorithm == 0 &&
                  <ButtonLabelWrapper style={{ maxWidth: '140px' }}>
                    <Text strong type="primary">K (# de grupos)</Text>
                    <InputNumber min={1} max={12} value={filter.k} onChange={(e)=> onChange("k",e)} />
                  </ButtonLabelWrapper>
                }
                {
                  filter.algorithm == 1 &&
                  <React.Fragment>
                    <ButtonLabelWrapper>
                      <Text strong type="primary">Núm. vecinos</Text>
                      <InputNumber min={1} max={20} style={{ maxWidth: '120px' }} value={filter.mins} onChange={(e)=> onChange("mins",e)} />
                    </ButtonLabelWrapper>
                    <ButtonLabelWrapper>
                    <Text strong type="primary">EPS</Text>
                    <InputNumber min={0.1} step="0.01" max={0.18} style={{ maxWidth: '120px' }} value={filter.eps} onChange={(e)=> onChange("eps",e)} />
                  </ButtonLabelWrapper>
                </React.Fragment>
                }
                {
                  filter.algorithm == 2 &&
                  <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                    <Text strong type="primary"># de Grupos</Text>
                    <InputNumber min={1} max={12} value={filter.k} onChange={(e)=> onChange("k",e)} />
                  </ButtonLabelWrapper>
                }
                <div style={{marginTop:"25px"}}><Button style={{fontWeight:"bold"}} type={"primary"} onClick={onCluster} disabled={isLoading}> Encontrar grupos </Button></div>
              </Space>
            </InputsCardAlgorithm>
        </div>
    );
}

ClusteringAlgorithmsFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default ClusteringAlgorithmsFilter;