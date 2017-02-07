import React from 'react';
import axios from 'axios';
import moment from 'moment';
import './CreateKlass.css';

export default class CreateKlass extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.departments = ['SCIENCE', 'ENGINEERING', 'LITERATURE', 'PHILOSOPHY'];
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault();
    this.setState({error: null});
    const {name, semester, credits, department, fee} = this.getFields();
    if(!this.isValid(name, semester, fee)) return;
    this.sendAjax(name, semester, credits, department, fee);
  }

  getFields(){
    const name = this.name.value;
    const semester = this.semester.value;
    const credits = +this.credits.value;
    const department = this.department.value;
    const fee = +this.fee.value;

    return {name, semester, credits, department, fee};
  }

  isValid(name, semester, fee){
    if(name.length < 1) return this.setState({error: 'Name too short'});
    if(!semester) return this.setState({error: 'Date not selected'});
    if(moment(semester) < moment()) return this.setState({error: 'Date is in the past'});
    if(fee < 1) return this.setState({error: 'Fee too low'});
    return true;
  }

  sendAjax(name, semester, credits, department, fee){
    const url = this.props.host + '/klasses';
    const payload = {name, semester, credits, department, fee};
    axios.post(url, payload)
    .then(rsp => {
      const klass = rsp.data;
      this.props.created(klass);
      this.name.value = '';
      this.semester.value = '';
      this.credits.value = '1';
      this.department.value = this.departments[0];
      this.fee.value = '';
    }).catch(e => {
      this.setState({error: e.message})
    });
  }

  render(){
    return (
      <div className="create-klass">
        <h3>Create Klass</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>

          <div className="form-group">
            <label>Name</label>
            <input placeholder="student" className="form-control" ref={n => this.name = n} type="text" />
          </div>
          
          <div className="form-group">
            <label>Semester</label>
            <input className="form-control" ref={n => this.semester = n} type="date" />
          </div>
          
          <div className="form-group">
            <label>Credits</label>
            <select className="form-control" ref={n => this.credits = n}>
              {
                Array(5).fill(null).map((_,i) => {
                  return <option key={i}>{i + 1}</option>
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select className="form-control" ref={n => this.department = n}>
              {
                this.departments.map((d,i) => {
                  return <option key={i} value={d}>{d.toLowerCase()}</option>
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label>Fee</label>
            <input placeholder="350" className="form-control" ref={n => this.fee = n} type="number" />
          </div>
                    
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
