/*  This file is used to provide an interface for communicating with the backend using
    axios for HTTP methods */
// CRUD: Create, Read, Update, Delete
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// add a new person to db.json and return the newPerson object that was posted
const create = (newPerson) => (
  axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
);

// retrieve all persons from db.json and return data object
const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
);

const update = (modifiedPerson) => (
  axios.put(`${baseUrl}/${modifiedPerson.id}`, modifiedPerson)
);

const remove = (person) => (
  axios.delete(`${baseUrl}/${person.id}`)
);

export default { getAll, create, remove, update };