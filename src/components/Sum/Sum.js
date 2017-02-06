import React from 'react';
import './Sum.css';

export default class Sum extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.add = this.add.bind(this);
  }

  add(){
    const a = +this.a.value;
    const b = +this.b.value;
    const sum = a + b;
    this.setState({sum});
  }

  render(){
    return (
      <div className="sum">
        <h1>Sum</h1>
        <input className="a" ref={n => this.a = n} type="number" />
        <button onClick={this.add}>+</button>
        <input className="b" ref={n => this.b = n} type="number" />
        <span>{this.state.sum}</span>
      </div>
    );
  }
}
