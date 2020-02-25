import React from 'react';
import App from './App';
import { shallow, mount, render } from 'enzyme';

test('renders File Browser text', () => {
  const { getByText } = render(<App />);
});

