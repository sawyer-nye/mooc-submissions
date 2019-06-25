import React, { useState } from 'react';

const Person = ({ name }) => {
  return <p>{name}</p>
}

const App = () => {
  const [persons, setPersons] = useState(
    [ { name: 'Arto Hellas' } ]
  );
  const [newName, setNewName] = useState('');

  // event handler for input field edits
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault();
    const nameObject = { name: newName };

    setPersons(persons.concat(nameObject));
    setNewName('');
    console.log(persons);
  }

  const getPersons = () => persons.map(person =>
    <Person
      key={persons.indexOf(person)}
      name={person['name']}
    />
  );

  return (
    <div>
      <div>debug-newName: {newName}</div>
      <div>debug-persons: {persons[0]['name']}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {getPersons()}
      </div>
    </div>
  )
}

export default App