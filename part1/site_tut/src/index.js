//import React from 'react'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/* A-B
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

/* C
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
*/

/* D.1
// good example of CONDITIONAL RENDERING
const History = ({allClicks}) => {
    if (allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        );
    }

    return (
        <div>
            button press history: {allClicks.join(' ')}
        </div>
    );
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
);

// NOTE: hooks may only be called from INSIDE of a function body that defines a component
const App = (props) => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'));
        setLeft(left + 1);
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        setRight(right + 1);
    }

    //debugger;

    return (
        <div>
            <div>
                {left}
                <Button onClick={handleLeftClick} text='left' />
                <Button onClick={handleRightClick} text='right' />
                {right}
                <History allClicks={allClicks} />
            </div>
        </div>
    );
}
*/

/* D.2
const App = (props) => {
    const [value, setValue] = useState(10);

    const hello = (who) => () => {
            console.log('hello', who);
        }

    return (
        <div>
            {value}
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('function')}>button</button>
        </div>
    );
}
*/

// never define components inside of other components!!!
const Display = props => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
);

const App = () => {
    const [value, setValue] = useState(10);

    const setToValue = (newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <Display value={value} />
            <Button handleClick={() => setToValue(1000)} text="thousand" />
            <Button handleClick={() => setToValue(0)} text="reset" />
            <Button handleClick={() => setToValue(value + 1)} text="increment" />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
