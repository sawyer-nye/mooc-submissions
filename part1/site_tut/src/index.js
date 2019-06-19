//import React from 'react'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/*
// props passed to the component are directly destructured into name and age
const Hello = ({ name, age }) => {
    // defines func bornYear that returns year - age
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born {bornYear()}</p>
        </div>
    );
}

const App = () => {
    const name = "Peter";
    const age = 10;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </>
    );
}
*/

// displays the counter value
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
);

const App = (props) => {
    const [ counter, setCounter ] = useState(0);

    // returns a func that sets counter to specified value
    // first func call: configures second function
    const setToValue = (value) => setCounter(value);

    return (
        <div>
            <Display counter={counter} />
            <Button
                onClick={() => setToValue(counter + 1)}
                text='plus'
            />
            <Button
                onClick={() => setToValue(counter - 1)}
                text='minus'
            />
            <Button
                onClick={() => setToValue(0)}
                text='zero'
            />
        </div>   
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
