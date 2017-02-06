import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
import { shallow, mount, render } from 'enzyme';

import Registration from './Registration';
axios.defaults.adapter = httpAdapter;

describe('Registration', function() {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should mount in a full DOM', function() {
    expect(shallow(<Registration host="http://fakehost.com" />)).to.be.ok;
  });
});
