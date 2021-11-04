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
            <div style={{"width":"50%","height": "7%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"260px"}}></div>
        </React.Fragment>
    );
}

ViolenceFilter.propTypes = {
    handleGetViolenceData : PropTypes.func,
    filter: PropTypes.object,
}

export default ViolenceFilter;