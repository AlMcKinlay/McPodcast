import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Drop an mp3 file, or click here to select one./i);
  expect(linkElement).toBeInTheDocument();
});
