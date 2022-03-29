import React, {useState} from 'react';
import { 
    Space,
    Select,
    Typography,
    Button,
} from 'antd';

import {
    clusteringAlgorithmsNames,
    algorithmDescription,
} from './utils/utils';

import kmedoidsImage from './utils/kmedoids-steps.drawio.png';
import dbscanImage from './utils/dbscan-steps.drawio.png';
import linkageImage from './utils/average_linkage_steps.drawio.png';

import { 
    DownloadCard,
    ButtonLabelWrapper,
    AlgorithmAdditionalInfo,
} from './Clustering.styles';

import PropTypes from 'prop-types';
import {json2excel} from 'js2excel';

const { Text, Paragraph } = Typography;
const {Option} = Select;

function AdditionalInfo({algorithm}){
    const blockContent = algorithmDescription[algorithm];
    const images = {
        '0' : kmedoidsImage,
        '1' : dbscanImage,
        '2' : linkageImage,
    };
    return (
        <div>
          <AlgorithmAdditionalInfo>
            <Text strong type="primary">{`Algoritmo ${clusteringAlgorithmsNames[algorithm]}:`}</Text>
            <div class="imgviewer" style={{ marginLeft : "45px"}}>
                <div style={{fontWeight: "bold", border: "2px solid black"}}>Visualizar ejemplo</div>
                <span class="imgviewercontent"><img src={images[algorithm]} alt="algorithm" width="100%"/></span>
            </div>
            <Paragraph>
              <pre>{blockContent}</pre>
            </Paragraph>
            
          </AlgorithmAdditionalInfo>
        </div>
    );
}

export default AdditionalInfo;