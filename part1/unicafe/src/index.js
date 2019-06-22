import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = (good, neutral, bad) => {
    if (good + neutral + bad === 0) return 0;

    return (
      ((good) + (bad * -1)) / (good + neutral + bad)
    );
  }

  const calculatePositive = (good, neutral, bad) => {
    if (good + neutral + bad === 0) return 0;
    
    return (
      (100 * (good / (good + neutral + bad))) + " %"
    );
  }

  if (good + neutral + bad === 0) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic text="average" value={calculateAverage(good, neutral, bad)} />
        <Statistic text="positive" value={calculatePositive(good, neutral, bad)} />
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);