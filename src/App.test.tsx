import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App.tsx', () => {
  it('Should render component correct', () => {
    render(<App />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
