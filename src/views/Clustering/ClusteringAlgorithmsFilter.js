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
          <div style={{"width":"90%", "fontSize":"15px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Método para encontrar grupos:</Text> </div>
          <InputsCardAlgorithm>
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <div style={{fontSize:"11px", fontWeight:"bold"}}>Algoritmo</div>
                  <Select size="small" value={filter.algorithmLabel} style={{ width: "100px" }} onChange={e => onChange('algorithm',e)}>
                    <Option key={0}>{'K-Medoids'}</Option>
                    <Option key={1}>{'DBSCAN'}</Option>
                    <Option key={2}>{'Linkage'}</Option>
                  </Select>
                </ButtonLabelWrapper>
                {
                  filter.algorithm == 0 &&
                  <ButtonLabelWrapper style={{ maxWidth: '140px' }}>
                    <div style={{fontSize:"11px", fontWeight:"bold"}}>K (# de grupos)</div>
                    <InputNumber size="small"  style={{ width: "80px" }} min={1} max={12} value={filter.k} onChange={(e)=> onChange("k",e)} />
                  </ButtonLabelWrapper>
                }
                {
                  filter.algorithm == 1 &&
                  <React.Fragment>
                    <ButtonLabelWrapper>
                      <div style={{fontSize:"11px", fontWeight:"bold"}}>Núm. vecinos</div>
                      <InputNumber size="small" min={1} max={20} style={{ width: '80px' }} value={filter.mins} onChange={(e)=> onChange("mins",e)} />
                    </ButtonLabelWrapper>
                    <ButtonLabelWrapper>
                    <div style={{fontSize:"11px", fontWeight:"bold"}}>EPS</div>
                    <InputNumber size="small"  min={0.1} step="0.01" max={0.18} style={{ width: '55px' }} value={filter.eps} onChange={(e)=> onChange("eps",e)} />
                  </ButtonLabelWrapper>
                </React.Fragment>
                }
                {
                  filter.algorithm == 2 &&
                  <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                    <div style={{fontSize:"11px", fontWeight:"bold"}}># de Grupos</div>
                    <InputNumber size="small" min={1} max={12} value={filter.k} onChange={(e)=> onChange("k",e)} />
                  </ButtonLabelWrapper>
                }
                <div style={{marginTop:"10px"}}><Button style={{fontWeight:"bold", fontSize: "11px", width:"115px", height:"25px", marginTop:"7px"}} type={"primary"} onClick={onCluster} disabled={isLoading}> Encontrar grupos </Button></div>
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