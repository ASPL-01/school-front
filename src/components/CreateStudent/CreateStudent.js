import React from 'react';
import axios from 'axios';
import './CreateStudent.css';

export default class CreateStudent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault();
    this.setState({error: null});
    const email = this.email.value;
    if(email.length < 7){
      this.setState({error: 'Email too short'});
      return;
    }

    const url = this.props.host + '/students';
    const payload = {email};
    axios.post(url, payload)
    .then(rsp => {
      const student = rsp.data;
      this.props.created(student);
      this.email.value = '';
    }).catch(e => e);
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
