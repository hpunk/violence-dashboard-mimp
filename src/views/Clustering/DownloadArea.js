import React, {useState} from 'react';
import { 
    Space,
    Select,
    Typography,
    Button,
} from 'antd';

import { 
    DownloadCard,
    ButtonLabelWrapper,
} from './Clustering.styles';

import PropTypes from 'prop-types';
import {json2excel} from 'js2excel';

const { Text } = Typography;
const {Option} = Select;

function DownloadArea({clusters}){
    let groupOptions = clusters.map(c => c.group);
    groupOptions = groupOptions.map(i => <Option key={i}>{i}</Option>)
    const [group, setGroup] = useState(0);
    const [loading, setLoading] = useState(false);

    const download = () => {
        const data = clusters.find(c => c.group == group).data;
        setLoading(true);
        try {
            json2excel({
                data,
                name: `datos-grupo-${group}`,
                formateDate: 'dd/mm/yyyy'
            });
            setLoading(false);
        } catch (e) {
            console.error('export error');
            setLoading(false);
        }
    }

    return (
        <div>
          <div style={{"width":"90%", "fontSize":"20px", "fontWeight": "bold", "marginLeft":"10px"}}> <Text type="primary" >Descarga de datos:</Text> </div>
          
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <Text type="primary">Grupo</Text>
                  <Select value={group} style={{ width: 120 }} onChange={e => setGroup(e)}>
                    {groupOptions}
                  </Select>
                </ButtonLabelWrapper>
                <div style={{marginTop:"25px"}}><Button type={"primary"} onClick={download} disabled={loading}> Descargar datos </Button></div>
              </Space>
            
        </div>
    );
}

DownloadArea.propTypes = {
    clusters: PropTypes.array,
}

export default DownloadArea;