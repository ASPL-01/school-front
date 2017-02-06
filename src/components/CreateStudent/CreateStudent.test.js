import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import CreateStudent from './CreateStudent';

describe('List', () => {
  beforeEach(() => {
  });

  it('should render without error', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper).to.be.ok;
  });

  it('should find component using its class name', () => {
    const wrapper = shallow(<CreateStudent />);
    expect(wrapper.find(".create-student").length).to.equal(1);
  });

  // it('should get the header from component', () => {
  //   const wrapper = shallow(<List header="Students" />);
  //   expect(wrapper.text()).to.equal('Students');
  // });

  // it('should render out 3 boxes', () => {
  //   const wrapper = mount(<List header="Students" items={students} />);
  //   expect(wrapper.find('.box').length).to.equal(3);
  // });

  // it('should display sam in the 2nd box', () => {
  //   const wrapper = mount(<List header="Students" items={students} />);
  //   expect(wrapper.find(Box).at(1).find('div > div').html()).to.equal('<div data-id="4" class="empty">sam</div>');
  // });

  // it('should call fn when 2nd box is clicked', () => {
  //   const stub = sinon.stub();
  //   const wrapper = mount(<List click={stub} header="Students" items={students} />);
  //   wrapper.find(Box).at(1).find('div > div').simulate('click');
  //   expect(stub.callCount).to.equal(1);
  // });
});
