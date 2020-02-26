import React from 'react';
import FileBrowser from './file-browser'
import { shallow, mount, render } from 'enzyme';
import { validResponse, invalidFoldersResponse } from '../__mocks/__axios'

describe('<FileBrowser/>', () => {
    it('Should contain contain values when no props recieved', () => {
        const selectedFolders = {}
        const wrapper = shallow(<FileBrowser files={validResponse.data.data} onChange={selectedFolders} selectedFolders={{}} />);
        expect(wrapper.find('label')).toBeDefined();
        expect(wrapper.find('size')).toBeDefined();
        expect(wrapper.find('onChange')).toBeDefined();
        expect(wrapper.find('files')).toBeDefined();
        expect(wrapper.find('ul')).toBeDefined();
        expect(wrapper.find('.file-browser')).toBeDefined();
    });
    it('Should contain contain values when no props recieved', () => {
        const wrapper = shallow(<FileBrowser />);
        expect(wrapper.find('label')).toBeDefined();
        expect(wrapper.find('size')).toBeDefined();
        expect(wrapper.find('onChange')).toBeDefined();
        expect(wrapper.find('files')).toBeDefined();
        expect(wrapper.find('ul')).toBeDefined();
        expect(wrapper.find('.file-browser')).toBeDefined();
    });
    it('Folders should not have a size.', () => {
        const selectedFolders = {}
        const wrapper = shallow(<FileBrowser files={validResponse.data.data} onChange={selectedFolders} selectedFolders={{}} />);
        const props = wrapper.props().children[0].props.children[0].props;
        expect(wrapper.find('label')).toBeDefined();
        expect(props.label).toEqual('1080p');
        expect(props.type).toEqual('folder');
        expect(props.size).toEqual(undefined);
    });
    it('Files should have a size.', () => {
        const selectedFolders = {}
        const wrapper = shallow(<FileBrowser files={validResponse.data.data} onChange={selectedFolders} selectedFolders={{}} />);
        const props = wrapper.props().children[1].props.children[0].props;
        expect(wrapper.find('label')).toBeDefined();
        expect(props.label).toEqual('borders_orchard_kroon.pdf');
        expect(props.type).toEqual('file');
        expect(props.size).toEqual(76034);
    });
});