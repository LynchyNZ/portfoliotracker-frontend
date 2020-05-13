import React from 'react';
import { shallow } from 'enzyme';
import MainLayout from './MainLayout';
describe('MainLayout', () => {
  it('should render correctly', () => {
    const testComponent = () => {
      return (
      <div>test</div>
      );
    }
    const component = shallow(<MainLayout>{testComponent}</MainLayout>);
    expect(component).toMatchSnapshot();
  });
});