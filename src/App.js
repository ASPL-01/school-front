import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import CreateStudent from './components/CreateStudent/CreateStudent';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-xs-6">
            <CreateStudent />
          </div>
          <div className="col-xs-6"></div>
        </div>
      </div>
    );
  }
}
