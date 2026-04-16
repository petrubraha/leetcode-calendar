import { useState, useEffect } from 'react';
import { ConfigurationState } from '../types';
import { storageService } from '../services/chromeStorage';

export const useConfiguration = () => {
  const [state, setState] = useState<ConfigurationState | null>(null);

  useEffect(() => {
    storageService.getState().then(setState);
    storageService.onChanged(setState);
  }, []);

  const updateState = async (updates: Partial<ConfigurationState>) => {
    setState(prev => {
      if (!prev) return prev;
      const newState = { ...prev, ...updates };
      storageService.setState(newState);
      return newState;
    });
  };

  const updateLeetCode = (leetcode: ConfigurationState['leetcode']) => updateState({ leetcode });
  const updateGoogle = (google: ConfigurationState['google']) => updateState({ google });
  const updateCalendar = (selectedCalendarId: string | null) => updateState({ selectedCalendarId });

  const isConfigured = !!(
    state?.leetcode.isConnected &&
    state?.google.isConnected &&
    state?.selectedCalendarId
  );

  return {
    state,
    isConfigured,
    updateLeetCode,
    updateGoogle,
    updateCalendar
  };
};
