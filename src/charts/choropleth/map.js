import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import {Slider} from 'antd';
import LinearGradient from './LinearGradient.js';
import './map.css';

const PROJECTION_CONFIG = {
  scale: 1300,
  center: [-74.9629, -9.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: 'none',
    borders: 'blue'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};



function Map({mapJson, mapData, date, setDate}) {
  const [tooltipContent, setTooltipContent] = useState('');
  //const [data, setData] = useState(getHeatMapData());
  const data = mapData.length > 0 ? mapData[date-1].casesByUbigeo : [];

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.casesMale+item.casesFemale > max ? item.casesMale+item.casesFemale : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.casesMale+d.casesFemale))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.NOMBDEP}: H: ${current.casesMale} M: ${current.casesFemale}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };



  const MESES = {
    1:"ENERO",
    2:"FEBRERO",
    3:"MARZO",
    4:"ABRIL",
    5:"MAYO",
    6:"JUNIO",
    7:"JULIO",
    8:"AGOSTO",
    9:"SETIEMBRE",
    10:"OCTUBRE",
    11:"NOVIEMBRE",
    12:"DICIEMBRE",
  };

  return (
      <div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={450}
          height={450}
          data-tip=""
        >
          <Geographies geography={mapJson}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => `${s.ubigeo < 10 ? "0"+s.ubigeo : s.ubigeo}` === geo.properties.FIRST_IDDP);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.casesMale + current.casesFemale) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <LinearGradient data={gradientData} />
        <div className="center" style={{"width":"500px", "paddingLeft":"100px"}}>
          <Slider
            min={1}
            max={mapData.length}
            tipFormatter={value => { return value!==0 && mapData.length > 0 ? `${MESES[mapData[value-1].month] }/${mapData[value-1].year}`: ""}}
            onChange={e => setDate(e)}
            value={typeof date === 'number' ? date : 0}
          />
        </div>
        </div>
  );
}

export default Map;