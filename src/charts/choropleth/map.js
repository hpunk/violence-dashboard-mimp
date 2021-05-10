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

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { FIRST_IDDP: '01', state: 'Andhra Pradesh', value: getRandomInt() },
    { FIRST_IDDP: '02', state: 'Arunachal Pradesh', value: getRandomInt() },
    { FIRST_IDDP: '03', state: 'Assam', value: getRandomInt() },
    { FIRST_IDDP: '04', state: 'Bihar', value: getRandomInt() },
    { FIRST_IDDP: '05', state: 'Chhattisgarh', value: getRandomInt() },
    { FIRST_IDDP: '06', state: 'Goa', value: 21 },
    { FIRST_IDDP: '07', state: 'Gujarat', value: 22 },
    { FIRST_IDDP: '08', state: 'Haryana', value: getRandomInt() },
    { FIRST_IDDP: '09', state: 'Himachal Pradesh', value: 24 },
    { FIRST_IDDP: '10', state: 'Jharkhand', value: 26 },
    { FIRST_IDDP: '11', state: 'Karnataka', value: 27 },
    { FIRST_IDDP: '12', state: 'Kerala', value: getRandomInt() },
    { FIRST_IDDP: '13', state: 'Madhya Pradesh', value: getRandomInt() },
    { FIRST_IDDP: '14', state: 'Maharashtra', value: getRandomInt() },
    { FIRST_IDDP: '15', state: 'Manipur', value: getRandomInt() },
    { FIRST_IDDP: '16', state: 'Meghalaya', value: 59 },
    { FIRST_IDDP: '17', state: 'Mizoram', value: getRandomInt() },
    { FIRST_IDDP: '18', state: 'Nagaland', value: 59 },
    { FIRST_IDDP: '19', state: 'Odisha', value: 59 },
    { FIRST_IDDP: '20', state: 'Punjab', value: getRandomInt() },
    { FIRST_IDDP: '21', state: 'Rajasthan', value: getRandomInt() },
    { FIRST_IDDP: '22', state: 'Sikkim', value: getRandomInt() },
    { FIRST_IDDP: '23', state: 'Tamil Nadu', value: getRandomInt() },
    { FIRST_IDDP: '24', state: 'Telangana', value: getRandomInt() },
    { FIRST_IDDP: '25', state: 'Tripura', value: 14 },
  ];
};

function Map({mapJson}) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.NOMBDEP}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };
  
  const marks = {
    0: '05/2020',
    33: '06/2020',
    66: '07/2020',
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
                const current = data.find(s => s.FIRST_IDDP === geo.properties.FIRST_IDDP);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
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
          <Slider included={false} marks={marks} />
        </div>
        </div>
  );
}

export default Map;