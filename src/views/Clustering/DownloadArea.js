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
    AlgorithmAdditionalInfo,
} from './Clustering.styles';

import PropTypes from 'prop-types';
import {json2excel} from 'js2excel';
import {QuestionCircleOutlined} from "@ant-design/icons";

const { Text } = Typography;
const {Option} = Select;

function DownloadArea({clusters}){
    let groupOptions = clusters.map(c => c.group);
    groupOptions = groupOptions.map(i => <Option key={i}>{i}</Option>)
    const [group, setGroup] = useState(1);
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
        <AlgorithmAdditionalInfo>
        <div style={{ display:"flex"}}>
            <div style={{"width":"90%", "fontSize":"20px", "fontWeight": "bold"}}> 
                <Text type="primary" >Descarga de datos por grupo:</Text>
            </div>
            <div class="tooltip" style={{ width : "10%"}}>
                <QuestionCircleOutlined />
                <span class="tooltiptext">Descargar los casos de violencia agrupados de acuerdo al método escogido en forma de archivos .csv</span>
            </div>
        </div>
          
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <Text type="primary">Grupo</Text>
                  <Select value={group} style={{ width: 120 }} onChange={e => setGroup(e)}>
                    {groupOptions}
                  </Select>
                </ButtonLabelWrapper>
                <div style={{marginTop:"25px"}}><Button type={"primary"} onClick={download} disabled={loading}> Descargar datos </Button></div>
              </Space>
        </AlgorithmAdditionalInfo>
            
        </div>
    );
}

DownloadArea.propTypes = {
    clusters: PropTypes.array,
}

export default DownloadArea;