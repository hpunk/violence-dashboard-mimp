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
    const [group, setGroup] = useState("");
    const [loading, setLoading] = useState(false);

    const download = () => {
        const data = clusters.find(c => c.group == group).data;
        setLoading(true);
        try {
            json2excel({
                data,
                name: `datos-${group}`,
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
            <div style={{"width":"50%", "fontSize":"20px", "fontWeight": "bold"}}> 
                <div style={{fontSize:"13px", fontWeight:"bold"}} >Descarga de datos por grupo:</div>
            </div>
            <div class="tooltip" style={{ width : "10%"}}>
                <QuestionCircleOutlined />
                <span class="tooltiptext">Descargar los casos de violencia agrupados de acuerdo al método escogido en forma de archivos .csv</span>
            </div>
        </div>
          
              <Space  align={"right"}>
                <ButtonLabelWrapper style={{ maxWidth: '120px' }}>
                  <div style={{fontSize:"11px", fontWeight:"bold"}} >Grupo</div>
                  <Select size="small" value={group} style={{ width: "100px" }} onChange={e => setGroup(e)}>
                    {groupOptions}
                  </Select>
                </ButtonLabelWrapper>
                <div style={{marginTop:"15px"}}><Button type={"primary"} style={{height:"30px", fontSize:"11px"}} size="small" onClick={download} disabled={group == "" || loading}> Descargar datos </Button></div>
              </Space>
        </AlgorithmAdditionalInfo>
            
        </div>
    );
}

DownloadArea.propTypes = {
    clusters: PropTypes.array,
}

export default DownloadArea;