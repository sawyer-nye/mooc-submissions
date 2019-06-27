import React from 'react';

const PersonForm = ({ nameValue, nameChange, numberValue, numberChange, submitOnClick }) => (
  <form>
    <h3>Add new contact</h3>
    <div>
      name: <input value={nameValue} onChange={nameChange}/>
    </div>
    <div> 
      number: <input value={numberValue} onChange={numberChange}/>
    </div>
    <div>
      <button type="submit" onClick={submitOnClick}>add</button>
    </div>
  </form>
);

export default PersonForm;