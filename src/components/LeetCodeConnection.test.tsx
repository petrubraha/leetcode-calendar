import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeetCodeConnection } from './LeetCodeConnection';

describe('LeetCodeConnection', () => {
  const mockProps = {
    state: { isConnected: false, username: null },
    onConnect: jest.fn(),
    onDisconnect: jest.fn(),
  };

  test('renders connect button when not connected', () => {
    render(<LeetCodeConnection {...mockProps} />);
    expect(screen.getByText('Connect')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Connect'));
    expect(mockProps.onConnect).toHaveBeenCalled();
  });

  test('renders disconnect button and username when connected', () => {
    render(<LeetCodeConnection {...mockProps} state={{ isConnected: true, username: 'LeetUser' }} />);
    expect(screen.getByText('LeetUser')).toBeInTheDocument();
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockProps.onDisconnect).toHaveBeenCalled();
  });
});
