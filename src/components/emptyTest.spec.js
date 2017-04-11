import React from 'react';
import {shallow} from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  it('should have a header called \'Home Page\'', () => {
    const wrapper = shallow(<HomePage />);
    const actual = wrapper.find('h2').text();
    const expected = 'Home Page';

    expect(actual).toEqual(expected);
  });
});