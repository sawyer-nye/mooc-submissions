import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// EVENT HANDLERS MUST ALWAYS BE A FUNCTION OR A REFERENCE TO A FUNCTION

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
);

const App = ({ anecdotes }) => {
  // state handling
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));

  const generateAnecdote = (anecdotes) => {
    let index = Math.floor(Math.random() * (anecdotes.length));

    setSelected(index);
  }

  const updateVotes = (votes, selected) => {
    const copy = [...votes];
    copy[selected]++;

    setVotes(copy);
    getBestAnecdote(votes);
  }
  
  const getBestAnecdote = (votes) => {
    const mostVotes = Math.max(...votes);
    console.log(votes[votes.indexOf(mostVotes)]);
    return anecdotes[votes.indexOf(mostVotes)];
  }

  console.log(votes, selected);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p className="red-text">{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={() => updateVotes(votes, selected)} text="vote" />
      <Button handleClick={() => generateAnecdote(anecdotes)} text="next anecdote" />
      <hr />
      <h1>Anecdote with most votes</h1>
      <p>{getBestAnecdote(votes)}</p>
    </div>
  );
}

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);