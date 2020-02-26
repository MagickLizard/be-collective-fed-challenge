import React from 'react';
import FileIcons from './file-icons'
import { shallow, mount, render } from 'enzyme';
import { validResponse, invalidFoldersResponse, handleClickMock } from '../__mocks/__axios';

describe('<FileIcons/>', () => {
    it('Should contain values on load', async () => {
        const folder = validResponse.data.data[0];
        const wrapper = mount(<FileIcons
            selected={{}}
            label={folder.name}
            type={folder.type}
            size={folder.size}
            onChange={() => { handleClickMock(`id-${0}`) }}
        />);

        expect(wrapper.find('label')).toBeDefined();
        expect(wrapper.find('size')).toBeDefined();
        expect(wrapper.find('onChange')).toBeDefined();
        expect(wrapper.find('files')).toBeDefined();
        expect(wrapper.find('ul')).toBeDefined();
        expect(wrapper.find('fa files__icon')).toBeDefined();
    });
    it('Should have no chevrons down when no folders are selected.', async () => {
        const folder = validResponse.data.data[0];
        const wrapper = shallow(<FileIcons
            selected={{}}
            label={folder.name}
            type={folder.type}
            size={folder.size}
            onChange={() => { handleClickMock(`id-${0}`) }}
        />);
        expect(wrapper.find('fa files__icon')).toBeDefined();
        expect(wrapper.find('fa files__icon fa-folder')).toBeDefined();
        expect(wrapper.find('fa files__icon fa-chevron-right')).toBeDefined();
        expect(wrapper).not.toHaveProperty('fa files__icon fa-chevron-down');
    });
    it('Should change chevron to down on selected folder', async () => {
        const folder = validResponse.data.data[0];
        const wrapper = shallow(<FileIcons
            selected={folder}
            label={folder.name}
            type={folder.type}
            size={folder.size}
            onChange={() => { handleClickMock(`id-${0}`) }}
        />);
        expect(wrapper).not.toHaveProperty('fa files__icon fa-chevron-down');
        expect(wrapper.find('fa files__icon')).toBeDefined();
        expect(wrapper.find('fa files__icon fa-folder')).toBeDefined();

        wrapper.simulate('mouseenter')
        wrapper.simulate('mouseleave')
        expect(wrapper.find('fa files__icon fa-chevron-down')).toBeDefined();
    });
});