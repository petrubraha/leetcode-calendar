import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusWidget } from './StatusWidget';

describe('StatusWidget', () => {
  test('renders success state when configured', () => {
    render(<StatusWidget isConfigured={true} errors={[]} />);
    expect(screen.getByText('Ready to Sync')).toBeInTheDocument();
  });

  test('renders error state when not configured', () => {
    const errors = ['Missing connection'];
    render(<StatusWidget isConfigured={false} errors={errors} />);
    expect(screen.getByText('Configuration Required')).toBeInTheDocument();
    expect(screen.getByText('Missing connection')).toBeInTheDocument();
  });
});
