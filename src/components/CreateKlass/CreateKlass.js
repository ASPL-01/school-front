import React from 'react';
import axios from 'axios';
import './CreateKlass.css';

export default class CreateKlass extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault();
    const name = this.name.value;
    const semester = this.semester.value;
    const credits = this.credits.value;
    const department = this.department.value;
    const fee = this.fee.value;
    const url = this.props.host + '/klasses';

    axios.post(url, {name, semester, credits, department, fee}).then(r => {
      const klass = r.data;
      this.props.created(klass);
      this.setState({error: ""});
    }).catch(e => {
      this.setState({error: e.message});
    });
  }

  render(){
    return (
      <div className="create-klass">
        <h1>Create Student</h1>
        <div className="error">{this.state.error}</div>
        <form>
          <label>Name</label>
          <input ref={n => this.name = n} type="text" />
          <label>Semester</label>
          <input ref={n => this.semester = n} type="text" />
          <label>Credits</label>
          <input ref={n => this.credits = n} type="number" />
          <label>Department</label>
          <input ref={n => this.department = n} type="text" />
          <label>Fee</label>
          <input ref={n => this.fee = n} type="number" />
          <button onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
