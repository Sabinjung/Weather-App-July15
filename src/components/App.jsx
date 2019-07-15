import React, { Component } from 'react';
import Weather from './Weather.jsx'
import '../styles/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Weather />
      </div>
    );
  }
}

export default App;