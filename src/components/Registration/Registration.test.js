import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

import Registration from './Registration';
axios.defaults.adapter = httpAdapter;
let klass, wrap;

describe('Registration', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should render without error', () => {
    const wrapper = shallow(<Registration />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<Registration />);
    expect(wrapper.find(".registration").length).to.equal(1);
  });

  it('should have empty array for students and klasses', () => {
    const wrapper = shallow(<Registration />);
    expect(wrapper.state('students')).to.have.lengthOf(0);
    expect(wrapper.state('klasses')).to.have.lengthOf(0);
  });

  it('should fetch students and klasses on initial load', (done) => {
    const students = [{id:3, email:'bob'}, {id:5, email:'sara'}];
    const klasses  = [{id:7, name:'chem'}, {id:9, name:'maths'}];
    nock('http://fakehost.com')
    .get('/students')
    .reply(200, students);
    nock('http://fakehost.com')
    .get('/klasses')
    .reply(200, klasses);

    const wrapper = mount(<Registration host="http://fakehost.com" />);

    setTimeout(() => {
      try{
        expect(wrapper.state('students')).to.have.lengthOf(2);
        expect(wrapper.state('klasses')).to.have.lengthOf(2);
        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });

  it.only('should highlight clicked student and klasses', (done) => {
    const students = [{id:3, email:'bob'}, {id:5, email:'sara'}];
    const klasses  = [{id:7, name:'chem'}, {id:9, name:'maths'}];
    nock('http://fakehost.com')
    .get('/students')
    .reply(200, students);
    nock('http://fakehost.com')
    .get('/klasses')
    .reply(200, klasses);
    nock('http://fakehost.com')
    .get('/students/5/klasses')
    .reply(200, [{id:7, name:'chem'}]);

    const wrapper = mount(<Registration host="http://fakehost.com" />);

    setTimeout(() => {
      try{
        wrapper.find('.list').at(0).find('.box').at(1).find('div > div').simulate('click');
        setTimeout(() => {
          try{
            expect(wrapper.find('.list').at(0).find('.box').at(1).find('div > div').hasClass('selected')).to.be.true;
            expect(wrapper.find('.list').at(1).find('.box').at(0).find('div > div').hasClass('selected')).to.be.true;
            done();
          }catch(e){
            done.fail(e);
          }
        }, 1000);
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });
});
