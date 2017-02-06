import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'

import CreateStudent from './CreateStudent';
axios.defaults.adapter = httpAdapter;

describe('List', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should render without error', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper.find(".create-student").length).to.equal(1);
  });

  it('should call preventDefault when button is clicked', () => {
    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent />);
    wrapper.find('button').simulate('click', {preventDefault: stub});
    expect(stub.callCount).to.equal(1);
  });  

  it('should not allow email shorter than 7 characters', () => {
    const wrapper = mount(<CreateStudent />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error')).to.equal('Email too short');
  });  

  it('should create a new student', (done) => {
    nock('http://springboot.com')
    .post('/students', {email: 'sara@aol.com'})
    .reply(200, {id: 99, email: 'sara@aol.com'});

    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent host="http://springboot.com" created={stub} />);
    wrapper.find('input').get(0).value = "sara@aol.com";
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      const student = stub.getCall(0).args[0];
      expect(stub.callCount).to.equal(1);
      expect(student).to.deep.equal({id: 99, email: 'sara@aol.com'});
      expect(wrapper.find('input').get(0).value).to.equal('');
      done();
    }, 1000);
  });  

  it('should crash the server', (done) => {
    nock('http://springboot.com')
    .post('/students', {email: 'sara@aol.com'})
    .replyWithError('server exploded');

    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent host="http://springboot.com" created={stub} />);
    wrapper.find('input').get(0).value = "sara@aol.com";
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      try{
        expect(stub.callCount).to.equal(0);
        expect(wrapper.find('input').get(0).value).to.equal('sara@aol.com');
        expect(wrapper.find('.error').html()).to.equal('<div class="error">server exploded</div>');
        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });  
});
