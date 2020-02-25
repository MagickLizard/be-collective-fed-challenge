import React from 'react';
import App from './App';
import FileBrowser from './components/file-browser'
import { shallow, mount, render } from 'enzyme';


describe('<App/>', () => {
  it('Values on load', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('totalSize')).toEqual(0);
    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.find('.wrapper')).toBeDefined();
    expect(wrapper.state('loading')).toBe(true)
  });
  it('On componentDidMount data should exist', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount()
    expect(wrapper.find('.wrapper')).toBeDefined();
    expect(wrapper.state('loading')).toBe(false);
    expect(wrapper.state('totalSize')).toBeGreaterThan(0);
    expect(wrapper.state('data').length).toBeGreaterThan(0);
  });

});
