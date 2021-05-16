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
const { Option } = Select;

function ViolenceFilter({onFilterChange}){
    let dayOptions = [];
    for(let i=1;i<16;i++)
        dayOptions.push(<Option value={i}>{i}</Option>);

    
    return (
        <React.Fragment>
            <div style={{"width":"50%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"260px"}}> <Text type="primary" >Casos de violencia:</Text> </div>
            <InputsCardViolence>
                <Space align={"right"}>
                    <ButtonLabelWrapper>
                    <Text type="primary">Días antes</Text>
                    <Select defaultValue="5" style={{ width: 120 }} onChange={(e)=> onFilterChange("days_before",e)}>
                        {dayOptions}
                    </Select>
                    </ButtonLabelWrapper>
                    <ButtonLabelWrapper>
                    <Text type="primary">Días despues</Text>
                    <Select defaultValue="5" style={{ width: 120 }} onChange={(e)=> onFilterChange("days_after",e)}>
                        {dayOptions}
                    </Select>
                    </ButtonLabelWrapper>
                </Space>
            </InputsCardViolence>
        </React.Fragment>
    );
}

ViolenceFilter.propTypes = {
    handleGetViolenceData : PropTypes.func,
    filter: PropTypes.object,
}

export default ViolenceFilter;