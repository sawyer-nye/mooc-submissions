import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // retrieve the notes from json server upon App render
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important
    };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        );
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      //id: notes.length + 1, <-- ommitted; better for server to generate id
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      // give every note a unique event handler function
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  );

  // if showAll false, filter out all but important notes to display
  const notesToShow = showAll ? 
    notes : notes.filter(note => note.important);

  const handleNoteChange = (event) => {
    // target refers to the input field of form
    setNewNote(event.target.value);
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