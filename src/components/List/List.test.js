import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import List from './List';
import Box from '../Box/Box';

describe('List', () => {
  it('should render without error', () => {
    const wrapper = shallow(<List />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<List />);
    expect(wrapper.find(".list").length).to.equal(1);
  });

  it('should get the header from component', () => {
    const wrapper = shallow(<List header="Students" />);
    expect(wrapper.text()).to.equal('Students');
  });

  it('should render out 3 boxes', () => {
    const students = [
      {id:3, text:"bob", css:"selected"},
      {id:4, text:"sam", css:"empty"},
      {id:5, text:"sue", css:"selected"}
    ];
    const wrapper = mount(<List header="Students" items={students} />);
    expect(wrapper.find('.box').length).to.equal(3);
  });
});
