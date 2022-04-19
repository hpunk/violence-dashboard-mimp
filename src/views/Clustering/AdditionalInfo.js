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
    const videos = {
        '0' : <iframe width="1120" height="630" src="https://www.youtube.com/embed/1Rp0hsMAfFY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        '1' : <iframe width="1120" height="630" src="https://www.youtube.com/embed/YX8OBf80OVQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        '2' : <iframe width="1120" height="630" src="https://www.youtube.com/embed/4fgKYQQ0kW8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
    };
    return (
        <div>
          <AlgorithmAdditionalInfo>
            <Text strong type="primary">{`Algoritmo ${clusteringAlgorithmsNames[algorithm]}:`}</Text>
            <div class="imgviewer" style={{ marginLeft : "45px"}}>
                <div style={{fontWeight: "bold", border: "2px solid black", padding: "2px"}}>Ver vídeo</div>
                <span class="imgviewercontent">{videos[algorithm]}</span>
            </div>
            <Paragraph>
              <pre>{blockContent}</pre>
            </Paragraph>
            
          </AlgorithmAdditionalInfo>
        </div>
    );
}

export default AdditionalInfo;