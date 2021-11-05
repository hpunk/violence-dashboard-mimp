
import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: 180,
    margin: 'auto'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
    height: 20
  };
  return (
    <div>
      <div style={{"marginLeft":"30%", fontWeight:"bold", width:400}}>Intensidad de color por número de casos</div>
      <div style={boxStyle} className="display-flex">
        <span style={{fontWeight:"bold"}}>{data.min}</span>
        <span className="fill"></span>
        <span style={{fontWeight:"bold"}}>{data.max}</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} className="mt8"></div>
    </div>
  );
};

LinearGradient.propTypes = {
  data: PropTypes.object.isRequired
};

export default LinearGradient;