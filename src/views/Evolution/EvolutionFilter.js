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

function EvolutionFilter({filter, onSearch}){
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    return (
        <InputsCardAPP>
            <Space  align={"right"}>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha inicio:</Text>
                <DatePicker defaultValue={moment('01/01/2019', 'DD/MM/YYYY')} format={dateFormatList} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Fecha fin:</Text>
                <DatePicker defaultValue={moment('30/01/2019', 'DD/MM/YYYY')} format={dateFormatList} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Filtrar por:</Text>
                <Select defaultValue="Departamento" style={{ width: 145 }} />
              </ButtonLabelWrapper>
              <ButtonLabelWrapper>
                <Text type="primary">Departamento:</Text>
                <Select defaultValue="Todos" style={{ width: 120 }} />
              </ButtonLabelWrapper>
              <div style={{marginTop:"25px"}}><button onClick={onSearch}> Buscar </button></div>
            </Space>
          </InputsCardAPP>
    );
}

EvolutionFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default EvolutionFilter;