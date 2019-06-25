import React, { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  );

  // if showAll false, filter out all but important notes to display
  const notesToShow = showAll ? 
    notes : notes.filter(note => note.important);

  const handleNoteChange = (event) => {
    // target refers to the input field of form
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    // vvv: good; never directly mutate state in React
    setNotes(notes.concat(noteObject));
    setNewNote('');
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;