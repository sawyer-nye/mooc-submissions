import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Weather from './components/Weather';

const App = () => {
  const [filterState, setFilterState] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [weatherData, setWeatherData] = useState({});

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

  // event handler for filter input field
  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  }

  const retrieveWeatherData = (capital) => {
    // request: http://api.apixu.com/v1/  current.json  ?key=f85db64b2eb746fe950220616192806&  q=CITY
    axios
      .get(`http://api.apixu.com/v1/current.json?key=f85db64b2eb746fe950220616192806&q=${capital}`)
      .then(response => {
        console.log('promise fulfilled');
        let currentData = response.data.current;
        setWeatherData({
          capital: capital,
          temperature: currentData.temp_f + " Fahrenheit",
          imgSrc: currentData.condition.icon,
          wind: currentData.wind_mph + "mph " + currentData.wind_dir
        });
      });
  }

  const getCountriesView = () => {
    // narrow countriesToShow down to those beginning with the filter
    const countriesToShow = countryData.filter(country =>
      country.name.toLowerCase().includes(filterState.toLowerCase()));

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
      return countriesToShow.map(country => <p key={country.flag}>{country.name}</p>);
    }
    else if (countriesToShow.length === 1) {
      let country = countriesToShow[0];
      retrieveWeatherData(country.capital);
      return(
        <div>
          <Country
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flagSrc={country.flag}
          />
          <Weather data={weatherData}/>
        </div>
      );
    }
    
    return <p>Nothing to see here.</p>
  }

  return (
    <div>
      
      <div>
        find countries <input value={filterState} onChange={handleFilterChange}/>
      </div>

      <div>{getCountriesView()}</div>
      
    </div>
    
  );
}

export default App;
