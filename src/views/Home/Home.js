import React from 'react';
import {Typografy, Typography} from 'antd';
import {
  HomeContainer,
  ModulesAreaContainer,
  TitleContainer,
  ModuleContainer,
} from './Home.styles.js';
import Popup from 'reactjs-popup';
import impactImage from './images/impacto_foto.png'
import evolutionImage from './images/evolution_foto.png'
import clusteringImage from './images/clustering_foto.png'

const {Title, Paragraph} = Typography;

const Home = () => {
  return (
    <HomeContainer>
      <TitleContainer>
        <Title>Herramienta de analítica visual para datos sobre violencia publicados por el MIMP</Title>
        <h2 style={{fontWeight:"bold"}}>Tesista: Gustavo André Alzamora Vargas</h2>
        <h3 style={{fontWeight:"bold"}}>La presente herramienta usa datos de casos de violencia y acciones preventivas publicados por el MIMP para los años 2017, 2018, 2019, 2020</h3>
        <button><a style={{fontWeight:"bold"}} target="_blank" href="https://forms.gle/hHEmAYEX3NnLJT3t6">Completar formulario de evaluación</a></button>
      </TitleContainer>
      <ModulesAreaContainer>
        <ModuleContainer>
          <img src={impactImage} width={"100%"} alt="impact_image" />
          <Paragraph><pre>El primer módulo "Impacto Acciones Preventivas", trata de ayudar a visualizar el impacto que puede existir por parte de las acciones preventivas en los casos de violencia posteriormente registrados</pre></Paragraph>
          <Popup modal nested trigger={<div style={{textAlign:"center"}}><button> Ver tutorial</button></div>}>
            <iframe width="1120" height="630" src="https://www.youtube.com/embed/jH9VR5mhcW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </Popup>
        </ModuleContainer>
        <ModuleContainer>
          <img src={evolutionImage} width={"100%"} alt="evolution_image" />
          <Paragraph><pre>El segundo módulo "Evolución de la violencia", puede ser usado para visualizar cómo es que los casos de violencia reportados varían a través del tiempo en los diferentes departamentos del Perú</pre></Paragraph>
          <Popup modal nested trigger={<div style={{textAlign:"center"}}><button> Ver tutorial</button></div>}>
            <iframe width="1120" height="630" src="https://www.youtube.com/embed/jH9VR5mhcW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </Popup>
        </ModuleContainer>
        <ModuleContainer>
          <img src={clusteringImage} width={"100%"} alt="clustering_image" />
          <Paragraph><pre>El tercer módulo "Clustering", permite llevar a cabo la identificación de grupos de casos de violencia basándose en qué tan parecidas son las características presentes en los casos registrados</pre></Paragraph>
          <Popup modal nested trigger={<div style={{textAlign:"center"}}><button> Ver tutorial</button></div>}>
            <iframe width="1120" height="630" src="https://www.youtube.com/embed/jH9VR5mhcW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </Popup>
        </ModuleContainer>
      </ModulesAreaContainer>
    </HomeContainer>
  )
}

export default Home