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

  it('Should calculateTotals and update state', async () => {
    const wrapper = shallow(<App />);
    const fixtureOfApiResponse = [ { type: 'folder',
    name: '1080p',
    children: [] },
  { type: 'file', name: 'borders_orchard_kroon.pdf', size: 76034 },
  { type: 'folder',
    name: 'wireless',
    children: [] } ]

     await wrapper.instance().calculateTotals(fixtureOfApiResponse)

    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.state('data')).toBeDefined();
    expect(wrapper.state('totalSize')).toBeGreaterThan(0);
  });
  it('Should try to calculateTotals() when data is bad', async () => {
    const wrapper = shallow(<App />);
     await wrapper.instance().calculateTotals([{type: "file"}])
console.log('wrapper.instance()>>',wrapper.instance())

    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.state('error')).toBeDefined();
  });
});
