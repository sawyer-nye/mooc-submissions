import React from 'react';

const Country = ({ name, capital, population, languages, flagSrc }) => {
  // returns list elements from languages array
  const getLanguages = () => languages.map(language => 
    <li key={language.iso639_1}>{language.name}</li>
  );
  
  return (
    <div>
      <h2>{name}</h2>
      
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <br />

      <h3>Languages</h3>
      <ul>
        {getLanguages()}
      </ul>

      <img src={flagSrc} alt="flag" style={{width: 300}}/>
    </div>
  );
}

export default Country;