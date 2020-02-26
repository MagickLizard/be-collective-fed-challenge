import React from 'react';
import App from './App';
import { validResponse, invalidFoldersResponse } from './__mocks/__axios'
import { shallow, mount, render } from 'enzyme';
import * as axios from "axios";
jest.mock("axios");

describe('<App/>', () => {

  it('Should have values on load', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('totalSize')).toEqual(0);
    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.find('.wrapper')).toBeDefined();
    expect(wrapper.state('loading')).toBe(true)
  });

  it('Expect componentDidMount to exist', async () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    mount(<App />);
    expect(App.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  });

  it('ComponentDidMount - should fetch files and state results should exist', async () => {
    const stateResult = {
      data: [
        { type: 'folder', name: '1080p', children: [] },
        { type: 'folder', name: 'wireless', children: [] },
        { type: 'file', name: 'borders_orchard_kroon.pdf', size: 76034 }
      ],
      totalSize: 152068,
      fileCount: 2,
      selectedFolders: {},
      loading: false,
      error: false
    }
    axios.get.mockResolvedValue(validResponse);
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toEqual(stateResult);
  });

  it('ComponentDidMount - should fetch files and update data only state', async () => {
    const stateResult = {
      data: [{ type: 'folder' }, { type: 'folder' }],
      totalSize: 0,
      fileCount: 0,
      selectedFolders: {},
      loading: false,
      error: false
    }
    axios.get.mockResolvedValue(invalidFoldersResponse);
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toEqual(stateResult);
  });

  it('ComponentDidMount - Should handle errors from the api gracefully', async () => {
    const stateResult = {
      data: [],
      totalSize: 0,
      fileCount: 0,
      selectedFolders: {},
      loading: false,
      error: "network error"
    }
    axios.get.mockResolvedValue({});
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toEqual(stateResult);
  });
  it('ComponentDidMount - Should handle status 500 from api', async () => {
    const apiResponse = { data: {}, status: 500 };
    const stateResult = {
      data: [],
      totalSize: 0,
      fileCount: 0,
      selectedFolders: {},
      loading: false,
      error: "network error"
    }
    axios.get.mockResolvedValue(apiResponse);
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toEqual(stateResult);
  });

  it('Should calculate total and update state', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().calculateTotals(validResponse.data.data);
    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.state('data')).toBeDefined();
    expect(wrapper.state('totalSize')).toBeGreaterThan(0);
  });
  it('calculateTotals() - (file) maintain initial state when no matching data found.', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().calculateTotals([{ type: "file" }])

    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.state('error')).toEqual(false);
    expect(wrapper.state('totalSize')).toEqual(0);
    expect(wrapper.state('fileCount')).toEqual(0);
  });
  it('calculateTotals() - (folder) maintain initial state when no matching data found.', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().calculateTotals(invalidFoldersResponse.data.data)
    expect(wrapper.find('.container')).toBeDefined();
    expect(wrapper.state('error')).toEqual(false);
    expect(wrapper.state('totalSize')).toEqual(0);
    expect(wrapper.state('fileCount')).toEqual(0);
  });
});