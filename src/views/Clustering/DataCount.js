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
import {QuestionCircleOutlined} from "@ant-design/icons";

const { Text } = Typography;
const {Option} = Select;

function DataCount({count}){
    let kOptions = [1,2,3,4,5,6,7,8];
    kOptions = kOptions.map(i => <Option key={i}>{i}</Option>)
    const linkageGroupOptions = [0,1,2,3,4,5,6,7,8];
    
    return (
        <div>
          <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Casos:</Text> </div>
          <InputsCardAlgorithm>
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <Text strong type="primary">{count}</Text>
                  <div class="tooltip" style={{ position:"relative", float:"right"}}>
                    <QuestionCircleOutlined />
                    <span class="tooltiptext">Cantidad de casos a ser agrupados</span>
                  </div>
                </ButtonLabelWrapper>
              </Space>
            </InputsCardAlgorithm>
        </div>
    );
}

DataCount.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default DataCount;