import React from 'react';
import './CreateStudent.css';

export default class CreateStudent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(){
    console.log('***CREATE CLICKED***');
  }

  render(){
    return (
      <div className="create-student">
        <h3>Create Student</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>
          <div className="form-group">
            <label>Email Address</label>
            <input placeholder="student@allstate.com" className="form-control" ref={n => this.email = n} type="email" />
          </div>
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
