import { renderHook, act } from '@testing-library/react';
import { useConfiguration } from './useConfiguration';
import { storageService } from '../services/chromeStorage';

jest.mock('../services/chromeStorage');

describe('useConfiguration hook', () => {
  const mockInitialState = {
    leetcode: { isConnected: false, username: null },
    google: { isConnected: false, email: null },
    selectedCalendarId: null,
  };

  beforeEach(() => {
    (storageService.getState as jest.Mock).mockResolvedValue(mockInitialState);
    (storageService.onChanged as jest.Mock).mockImplementation(() => {});
    (storageService.setState as jest.Mock).mockResolvedValue(undefined);
  });

  test('loads initial state', async () => {
    const { result } = renderHook(() => useConfiguration());
    
    // Wait for the useEffect to fetch state
    await act(async () => {});
    
    expect(result.current.state).toEqual(mockInitialState);
  });

  test('updates leetcode state', async () => {
    const { result } = renderHook(() => useConfiguration());
    await act(async () => {});

    await act(async () => {
      result.current.updateLeetCode({ isConnected: true, username: 'test' });
    });

    expect(result.current.state?.leetcode.isConnected).toBe(true);
    expect(storageService.setState).toHaveBeenCalled();
  });

  test('isConfigured is true when all conditions are met', async () => {
    const { result } = renderHook(() => useConfiguration());
    await act(async () => {});

    await act(async () => {
      result.current.updateLeetCode({ isConnected: true, username: 'test' });
      result.current.updateGoogle({ isConnected: true, email: 'test@gmail.com' });
      result.current.updateCalendar('cal-1');
    });

    expect(result.current.isConfigured).toBe(true);
  });
});
