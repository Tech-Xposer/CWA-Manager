import React from 'react';
import ReactDOM from 'react-dom';

const cDate = new Date()

ReactDOM.render(
  <>
    <h1>Ashutosh Sharma</h1>
    <p>{cDate.toLocaleDateString()}</p>
    <p>{cDate.toLocaleTimeString()}</p>
    
  </>,
  document.getElementById('root')
)