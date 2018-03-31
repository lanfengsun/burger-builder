import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()});

describe('<NavItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    });

    it('should render two <NavItem /> if isAuthenticated is false', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });
    it('should render three <NavItem /> if isAuthenticated is true', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });
    it('should render a logout <NavItem /> if isAuthenticated is true', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
    });
});