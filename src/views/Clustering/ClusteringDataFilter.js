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

function ClusteringDataFilter({filter, onSearch}){
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha inicio</Text>
                <DatePicker defaultValue={moment('01/01/2019', 'DD/MM/YYYY')} format={dateFormatList} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha fin</Text>
                <DatePicker defaultValue={moment('30/01/2019', 'DD/MM/YYYY')} format={dateFormatList} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Departamento</Text>
                <Select defaultValue="Todos" style={{ width: 120 }} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Provincia</Text>
                <Select defaultValue="Todos" style={{ width: 120 }} />
              </ButtonLabelWrapper>
            </Space>
          </InputsCardAPP>
    );
}

ClusteringDataFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default ClusteringDataFilter;