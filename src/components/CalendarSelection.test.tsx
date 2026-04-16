import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarSelection } from './CalendarSelection';

describe('CalendarSelection', () => {
  const mockCalendars = [
    { id: '1', summary: 'Cal 1' },
    { id: '2', summary: 'Cal 2' },
  ];
  const mockOnSelect = jest.fn();

  test('renders options and handles selection', () => {
    render(
      <CalendarSelection 
        calendars={mockCalendars} 
        selectedId={null} 
        onSelect={mockOnSelect} 
        disabled={false} 
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });

  test('is disabled when requested', () => {
    render(
      <CalendarSelection 
        calendars={mockCalendars} 
        selectedId={null} 
        onSelect={mockOnSelect} 
        disabled={true} 
      />
    );
    
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByText(/Connect Google Calendar/)).toBeInTheDocument();
  });
});
