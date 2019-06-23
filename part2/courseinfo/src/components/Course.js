import React from 'react';

const Header = ({ course }) => (
  <div>
    <h2>{course}</h2>
  </div>
);

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}

const Content = ({ parts }) => {
  const fetchParts = () => parts.map(part =>
      <Part 
        key={part.id} 
        name={part.name}
        exercises={part.exercises}
      />
    );

  return (
    <div>
      {fetchParts()}
    </div>
  );
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, curr) => sum + curr.exercises, 0);

  return (
    <div>
      <p style={{fontWeight: "bold"}}>Total of {total} exercises</p>
    </div>
  );
}

const Course = ({ course }) => {  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;