import React from 'react';

const Person = ({ name, number, deleteOnClick }) => (
  <div>
    {name} {number} <button onClick={deleteOnClick}>delete</button>
  </div>
);

export default Person