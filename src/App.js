import React, { Component } from 'react';
import Registration from './components/Registration/Registration';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Registration host="http://localhost:9000" />
      </div>
    );
  }
}
