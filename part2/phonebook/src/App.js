import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      });
  }, []);

  const personsFilter = (person) => person['name'].toLowerCase().includes(filterState.toLowerCase());

  // creates personsToShow list where it changes if filter field is any value besides ''
  const personsToShow = (filterState.length === 0) ?
    persons : persons.filter(personsFilter);

  // event handler for name field edits
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  // event handler for number field edits
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // event handler for filter field edits
  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  }

  // handles new person creation
  const addPerson = (event) => {
    // checks if person already exists in phonebook
    if (persons.some((person) => person['name'].toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      event.preventDefault(); // prevents a refresh of the page on submit
      const nameObject = { name: newName, number: newNumber };

      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  }  

  // retrieves persons to show and returns list of Person components
  const getPersons = () => personsToShow.map(person =>
    <Person
      key={person['name']}
      name={person['name']}
      number={person['number']}
    />
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterState} onChange={handleFilterChange} />

      <PersonForm 
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
        submitOnClick={addPerson}
      />
      
      <h3>Numbers</h3>

      <div>
        {getPersons()}
      </div>
    </div>
  )
}

export default App