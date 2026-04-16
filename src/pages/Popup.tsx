import * as React from 'react';
import { useState, useMemo } from 'react';
import { StatusWidget } from '../components/StatusWidget';
import { GoogleConnection } from '../components/GoogleConnection';
import { LeetCodeConnection } from '../components/LeetCodeConnection';
import { CalendarSelection } from '../components/CalendarSelection';
import { useConfiguration } from '../hooks/useConfiguration';
import { Calendar } from '../types';

export const Popup: React.FC = () => {
  const { state, isConfigured, updateLeetCode, updateGoogle, updateCalendar } = useConfiguration();
  const [mockCalendars] = useState<Calendar[]>([
    { id: 'primary', summary: 'My Calendar' },
    { id: 'work', summary: 'Work' },
    { id: 'leetcode', summary: 'LeetCode Reviews' }
  ]);

  const errors = useMemo(() => {
    if (!state) return [];
    const missing = [];
    if (!state.leetcode.isConnected) missing.push('Connect LeetCode');
    if (!state.google.isConnected) missing.push('Connect Google Calendar');
    if (!state.selectedCalendarId) missing.push('Select a calendar');
    return missing;
  }, [state]);

  if (!state) return <div className="loading">Loading configuration...</div>;

  return (
    <div className="container">
      <header>
        <h1>LeetCode Calendar</h1>
      </header>

      <StatusWidget isConfigured={isConfigured} errors={errors} />

      <LeetCodeConnection
        state={state.leetcode}
        onConnect={() => updateLeetCode({ isConnected: true, username: 'LeetUser' })}
        onDisconnect={() => updateLeetCode({ isConnected: false, username: null })}
      />

      <GoogleConnection
        state={state.google}
        onConnect={() => updateGoogle({ isConnected: true, email: 'user@gmail.com' })}
        onDisconnect={() => updateGoogle({ isConnected: false, email: null })}
      />

      <CalendarSelection
        calendars={mockCalendars}
        selectedId={state.selectedCalendarId}
        onSelect={updateCalendar}
        disabled={!state.google.isConnected}
      />
    </div>
  );
};
