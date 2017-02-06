import React, { Component } from 'react';
import Sum from './components/Sum/Sum';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <Sum />
        <Sum />
        <Sum />
      </div>
    );
  }
}

export default App;
