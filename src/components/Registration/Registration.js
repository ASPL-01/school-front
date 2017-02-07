import React from 'react';
import axios from 'axios';
import CreateStudent from '../CreateStudent/CreateStudent';
import CreateKlass from '../CreateKlass/CreateKlass';
import List from '../List/List';
import Promise from 'bluebird';
import './Registration.css';

export default class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {students: [], klasses: []};
    this.fetch = this.fetch.bind(this);
    this.studentClick = this.studentClick.bind(this);
    this.klassClick = this.klassClick.bind(this);
  }

  componentDidMount(){
    this.fetch();
  }

  fetch(){
    const surl = this.props.host + '/students';
    const kurl = this.props.host + '/klasses';
    Promise.all([axios.get(surl), axios.get(kurl)])
    .then(r => {
      const [stmp, ktmp] = r;
      const students = stmp.data.map(s => ({css: 'empty', id: s.id, text: s.email}));
      const klasses = ktmp.data.map(s => ({css: 'empty', id: s.id, text: s.name}));
      this.setState({students, klasses});
    }).catch(e => e);
  }

  studentClick(e){
    const id = +e.target.getAttribute('data-id');
    const url = `${this.props.host}/students/${id}/klasses`;
    axios.get(url)
    .then(r => {
      const ids = r.data.map(k => k.id);
      const students = this.state.students.map(s => ({...s, css: s.id === id ? 'selected' : 'empty'}));
      const klasses = this.state.klasses.map(k => ({...k, css: ids.includes(k.id) ? 'selected' : 'empty'}));
      this.setState({students, klasses});
    })
    .catch(e => e);
  }

  klassClick(e){
    const {id: sid} = this.state.students.find(s => s.css === 'selected') || {};
    if(!sid) return;

    const kid = +e.target.getAttribute('data-id');
    const css = e.target.getAttribute('class');
    const isAdd = css === "empty";
    const url = `${this.props.host}/klasses/${kid}/${isAdd ? 'add' : 'remove'}/${sid}`
    const method = isAdd ? 'post' : 'delete';

    axios({method, url}).then(r => {
      const newcss = isAdd ? "selected" : "empty";
      const klasses = this.state.klasses.map(k => ({...k, css: k.id === kid ? newcss : k.css}));
      this.setState({students: this.state.students, klasses});
    }).catch(e => e);
  }

  render(){
    return (
      <div className="registration">
        <h1>Registration</h1>
        <div className="row">
          <div className="col-xs-5">
            <CreateStudent host={this.props.host} created={this.fetch} />
          </div>
          <div className="col-xs-5">
            <CreateKlass host={this.props.host} created={this.fetch} />
          </div>
          <div className="col-xs-2"></div>
        </div>

        <div className="row">
          <div className="col-xs-5">
            <List header="Students" items={this.state.students} click={this.studentClick} />
          </div>
          <div className="col-xs-5">
            <List header="Klasses" items={this.state.klasses} click={this.klassClick} />
          </div>
          <div className="col-xs-2"></div>
        </div>
      </div>
    );
  }
}
