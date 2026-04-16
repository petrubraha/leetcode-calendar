import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoogleConnection } from './GoogleConnection';

describe('GoogleConnection', () => {
  const mockProps = {
    state: { isConnected: false, email: null },
    onConnect: jest.fn(),
    onDisconnect: jest.fn(),
  };

  test('renders connect button when not connected', () => {
    render(<GoogleConnection {...mockProps} />);
    expect(screen.getByText('Connect')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Connect'));
    expect(mockProps.onConnect).toHaveBeenCalled();
  });

  test('renders disconnect button and email when connected', () => {
    render(<GoogleConnection {...mockProps} state={{ isConnected: true, email: 'test@gmail.com' }} />);
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockProps.onDisconnect).toHaveBeenCalled();
  });
});
