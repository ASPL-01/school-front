import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import CreateStudent from './components/CreateStudent/CreateStudent';
import CreateKlass from './components/CreateKlass/CreateKlass';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-xs-6">
            <CreateStudent />
          </div>
          <div className="col-xs-6">
            <CreateKlass host="http://localhost:9000" created={k => console.log(k)} />
          </div>
        </div>
      </div>
    );
  }
}
