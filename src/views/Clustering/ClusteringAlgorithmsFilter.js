import React from 'react';
import { 
    Space,
    DatePicker,
    Select,
    Typography,
} from 'antd';

import { 
    InputsCardAPP,
    ButtonLabelWrapper,
} from '../Impact/Impact.styles';

import moment from 'moment';
import PropTypes from 'prop-types';

const { Text } = Typography;

function ClusteringAlgorithmsFilter({filter, onSearch}){
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Algoritmo</Text>
                <Select defaultValue="Average Linkage" style={{ width: 200 }} />
              </ButtonLabelWrapper>
              <div ><button onClick={onSearch}> Encontrar grupos </button></div>
            </Space>
          </InputsCardAPP>
    );
}

ClusteringAlgorithmsFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default ClusteringAlgorithmsFilter;