import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const [filterState, setFilterState] = useState('');
  const [countryData, setCountryData] = useState([]);

  // retrieves data on all countries from RESTCountries and sets countryData
  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountryData(response.data);
      });
  }, []);

  // narrow countriesToShow down to those beginning with the filter
  const countriesToShow = countryData.filter(country =>
    country.name.toLowerCase().startsWith(filterState.toLowerCase()));

  // event handler for filter input field
  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  }

  const getCountries = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      return countriesToShow.map(country => <p key={country.flag}>{country.name}</p>);
    }
    else if (countriesToShow.length === 1) {
      let country = countriesToShow[0];

      return(
        <Country
          name={country.name}
          capital={country.capital}
          population={country.population}
          languages={country.languages}
          flagSrc={country.flag}
        />
      );
    }
    
    return <p>Nothing to see here.</p>
  }

  

  return (
    <div>
      
      <div>
        find countries <input value={filterState} onChange={handleFilterChange}/>
      </div>

      <div>{getCountries()}</div>
      
    </div>
    
  );
}

export default App;
