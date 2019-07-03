/*  This file is used to provide an interface for communicating with the backend using
    axios for HTTP methods */

import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// retrieve all persons from db.json and return data object
const getAllPersons = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
);

// add a new person to db.json and return the newPerson object that was posted
const createPerson = (newPerson) => (
  axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
);

const deletePerson = (person) => (
  axios.delete(`${baseUrl}/${person.id}`)
);

export default { getAllPersons, createPerson, deletePerson };