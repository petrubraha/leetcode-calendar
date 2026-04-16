import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Popup } from './Popup';
import { useConfiguration } from '../hooks/useConfiguration';

jest.mock('../hooks/useConfiguration');

describe('Popup page', () => {
  const mockUpdateLeetCode = jest.fn();
  const mockUpdateGoogle = jest.fn();
  const mockUpdateCalendar = jest.fn();

  beforeEach(() => {
    (useConfiguration as jest.Mock).mockReturnValue({
      state: {
        leetcode: { isConnected: false, username: null },
        google: { isConnected: false, email: null },
        selectedCalendarId: null,
      },
      isConfigured: false,
      updateLeetCode: mockUpdateLeetCode,
      updateGoogle: mockUpdateGoogle,
      updateCalendar: mockUpdateCalendar,
    });
  });

  test('renders loading state when state is null', () => {
    (useConfiguration as jest.Mock).mockReturnValue({ state: null });
    render(<Popup />);
    expect(screen.getByText('Loading configuration...')).toBeInTheDocument();
  });

  test('renders all components when state is available', () => {
    render(<Popup />);
    expect(screen.getByText('LeetCode Calendar')).toBeInTheDocument();
    expect(screen.getByText('Configuration Required')).toBeInTheDocument();
    expect(screen.getByText('Google Calendar')).toBeInTheDocument();
    expect(screen.getByText('LeetCode')).toBeInTheDocument();
  });
});
