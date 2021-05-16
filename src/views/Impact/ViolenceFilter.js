import React from 'react';
import { 
    Space,
    Select,
    Typography,
} from 'antd';

import { 
    InputsCardViolence,
    ButtonLabelWrapper,
} from './Impact.styles';

import PropTypes from 'prop-types';

const { Text } = Typography;

function ViolenceFilter({filter, handleUpdateData}){
    return (
        <React.Fragment>
            <div style={{"width":"100%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"260px"}}> <Text type="primary" >Casos de violencia:</Text> </div>
            <InputsCardViolence>
                <Space align={"right"}>
                    <ButtonLabelWrapper>
                    <Text type="primary">Días antes</Text>
                    <Select defaultValue="5" style={{ width: 120 }} />
                    </ButtonLabelWrapper>
                    <ButtonLabelWrapper>
                    <Text type="primary">Días despues</Text>
                    <Select defaultValue="5" style={{ width: 120 }} />
                    </ButtonLabelWrapper>
                    <button onClick={handleUpdateData}> Cargar datos </button>
                </Space>
            </InputsCardViolence>
        </React.Fragment>
    );
}

ViolenceFilter.propTypes = {
    onSearch : PropTypes.func,
    filter: PropTypes.object,
}

export default ViolenceFilter;