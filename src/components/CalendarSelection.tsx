import * as React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Calendar } from '../types';

interface CalendarSelectionProps {
  calendars: Calendar[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
}

export const CalendarSelection: React.FC<CalendarSelectionProps> = ({ 
  calendars, 
  selectedId, 
  onSelect,
  disabled 
}) => {
  return (
    <div className={`selection-card ${disabled ? 'disabled' : ''}`}>
      <div className="card-header">
        <CalendarIcon className="card-icon" />
        <h4>Target Calendar</h4>
      </div>
      <div className="select-wrapper">
        <select 
          value={selectedId || ''} 
          onChange={(e) => onSelect(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>Select a calendar</option>
          {calendars.map(cal => (
            <option key={cal.id} value={cal.id}>{cal.summary}</option>
          ))}
        </select>
        <ChevronDown className="select-arrow" size={16} />
      </div>
      {disabled && state_message()}
    </div>
  );

  function state_message() {
    return <p className="hint">Connect Google Calendar to select a calendar.</p>;
  }
};
