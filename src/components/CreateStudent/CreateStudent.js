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
    const email = this.email.value;
    if(email.length < 7){
      this.setState({error: 'Email too short'})
      return;
    }

    const payload = {email};
    const url = this.props.host + '/students';
    axios.post(url, payload)
    .then(r => {
      const student = r.data;
      this.props.created(student);
      this.email.value = '';
      this.setState({error: ''});
    }).catch(e => {
      this.setState({error: e.message});
    });
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
