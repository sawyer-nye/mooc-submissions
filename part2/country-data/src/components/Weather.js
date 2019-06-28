import React from 'react';

const Weather = ({ data }) => {
  return (
    <div>
      <h3>Weather in {data.capital}</h3>
      <p><strong>Temperature:</strong> {data.temperature}</p>
      <img src={data.imgSrc} alt="weather toon" />
      <p><strong>Wind:</strong> {data.wind}</p>
    </div>
  );
}

export default Weather;