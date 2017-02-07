import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

import CreateKlass from './CreateKlass';
axios.defaults.adapter = httpAdapter;
let klass, wrap;

describe('CreateKlass', () => {
  beforeEach(() => {
    klass = {
      name: 'Chemistry',
      semester: '2018-01-03',
      credits: 4,
      department: 'SCIENCE',
      fee: 235
    };

    wrap = mount(<CreateKlass />);
    wrap.find('input').get(0).value = klass.name;
    wrap.find('input').get(1).value = klass.semester;
    wrap.find('select').get(0).value = klass.credits;
    wrap.find('select').get(1).value = klass.department;
    wrap.find('input').get(2).value = klass.fee;

    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should render without error', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateKlass />);
    expect(wrapper.find(".create-klass").length).to.equal(1);
  });

  it('should call preventDefault when the button is clicked', () => {
    const stub = sinon.stub();
    const wrapper = mount(<CreateKlass />);
    wrapper.find('button').simulate('click', {preventDefault: stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should NOT show error message when all fields are good', () => {
    wrap.find('button').simulate('click');
    expect(wrap.state('error')).to.be.null;
  });

  it('should show name too short error message', () => {
    wrap.find('input').get(0).value = '';
    wrap.find('button').simulate('click');
    expect(wrap.state('error')).to.equal('Name too short');
  });

  it('should show date not selected error message', () => {
    wrap.find('input').get(1).value = '';
    wrap.find('button').simulate('click');
    expect(wrap.state('error')).to.equal('Date not selected');
  });

  it('should show date in the past error message', () => {
    wrap.find('input').get(1).value = '2012-11-02';
    wrap.find('button').simulate('click');
    expect(wrap.state('error')).to.equal('Date is in the past');
  });

  it('should show fee too low error message', () => {
    wrap.find('input').get(2).value = '-4';
    wrap.find('button').simulate('click');
    expect(wrap.state('error')).to.equal('Fee too low');
  });

  it('should create a student', (done) => {
    nock('http://fakehost.com')
    .post('/klasses', klass)
    .reply(200, {id: 101, name: 'Chemistry'});

    const stub = sinon.stub();

    const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub} />);
    wrapper.find('input').get(0).value = klass.name;
    wrapper.find('input').get(1).value = klass.semester;
    wrapper.find('select').get(0).value = klass.credits;
    wrapper.find('select').get(1).value = klass.department;
    wrapper.find('input').get(2).value = klass.fee;
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      try{
        expect(stub.callCount).to.equal(1);
        expect(stub.getCall(0).args[0]).to.deep.equal({id: 101, name: 'Chemistry'});
        expect(wrapper.find('input').get(0).value).to.equal('');
        expect(wrapper.find('input').get(1).value).to.equal('');
        expect(wrapper.find('select').get(0).value).to.equal('1');
        expect(wrapper.find('select').get(1).value).to.equal('SCIENCE');
        expect(wrapper.find('input').get(2).value).to.equal('');
        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });

  it('should cause server to blow up', (done) => {
    nock('http://fakehost.com')
    .post('/klasses', klass)
    .replyWithError('Server just exploded');

    const stub = sinon.stub();

    const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stub} />);
    wrapper.find('input').get(0).value = klass.name;
    wrapper.find('input').get(1).value = klass.semester;
    wrapper.find('select').get(0).value = klass.credits;
    wrapper.find('select').get(1).value = klass.department;
    wrapper.find('input').get(2).value = klass.fee;
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      try{
        expect(stub.callCount).to.equal(0);
        expect(wrapper.find('input').get(0).value).to.equal('Chemistry');
        expect(wrapper.find('input').get(1).value).to.equal('2018-01-03');
        expect(wrapper.find('select').get(0).value).to.equal('4');
        expect(wrapper.find('select').get(1).value).to.equal('SCIENCE');
        expect(wrapper.find('input').get(2).value).to.equal('235');
        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });
});
