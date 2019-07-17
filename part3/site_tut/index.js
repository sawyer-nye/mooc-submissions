const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Takes JSON data of a request, transforms to object, then attaches to body property of
 * request object before route handler is called. */
app.use(bodyParser.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0 
  ? Math.max(...notes.map(n => n.id))
  : 0;

  return maxId + 1;
}

// Handle HTTP GET requests made to root
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

// Handle HTTP GET requests made to /notes
app.get('/notes', (req, res) => {
  res.json(notes) // Send notes array as JSON formatted string
});

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    res.json(note);
  } else {  // If note is undefined (all objects besides undefined are truthy)
    res.status(404).end();
  }
});

// Handle HTTP DELETE requests made to /notes/id
app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id); // Update the notes object to remove current note

  res.status(204).end();
})

// Handle HTTP POST requests made to /notes
app.post('/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note);

  res.json(note);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});