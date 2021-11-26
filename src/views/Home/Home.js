import React from 'react';
import {Typografy, Typography} from 'antd';

const {Title} = Typography;

const Home = () => {
  return (
  <div>
    <Title>Herramienta de analítica visual para datos sobre violencia publicados por el MIMP</Title>
    <h2>Tesista: Gustavo André Alzamora Vargas</h2>
    <br/>
    <h3>El primer módulo trata de ayudar a visualizar el impacto que puede existir en el registro de los casos de violencia posterior a la realización de acciones preventivas.</h3>
    <br/>
    <h3>El segundo módulo puede ser usado para visualizar cómo es que los casos de violencia reportados varían a través del tiempo en los diferentes departamentos del Perú</h3>
    <br/>
    <h3>El tercer módulo permite llevar a cabo la agrupación de casos de violencia basado en las características presentes en cada uno de los casos reportados</h3>
  </div>
  )
}

export default Home