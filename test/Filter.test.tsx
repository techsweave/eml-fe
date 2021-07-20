import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Filter from '../src/components/filter/Filter';


describe('testing filter visibility', () => {

  test('values and buttons visibility', () => {
    render(<Filter minProp={'1245'} maxProp={'2345'} />);
    expect(screen.getByText('Apply filter')).toBeVisible();
    expect(screen.getByText('Reset filter')).toBeVisible();
    expect(screen.getByText('1245')).toBeVisible();
    expect(screen.getByText('2345')).toBeVisible();
  });
});
