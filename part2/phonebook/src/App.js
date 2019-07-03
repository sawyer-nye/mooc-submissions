import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    console.log('effect');
    personService
      .getAllPersons()
      .then(persons => setPersons(persons));
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
    // checks if newName already exists in phonebook
    if (persons.some((person) => person['name'].toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      event.preventDefault(); // prevents a refresh of the page on submit
      const nameObject = { name: newName, number: newNumber };

      personService
        .createPerson(nameObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        });
    }
  }

  const removePerson = (person) => {
    //event.preventDefault();
    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .deletePerson(person)
        .then(
          setPersons(persons.filter(entry => entry.name !== person.name))
        );
    }
  }

  // retrieves persons to show and returns list of Person components
  const getPersons = () => personsToShow.map(person =>
    <Person
      key={person['name']}
      name={person['name']}
      number={person['number']}
      deleteOnClick={() => removePerson(person)}
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