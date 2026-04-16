import * as React from 'react';
import { Mail, Link2, Unlink } from 'lucide-react';
import { GoogleCalendarState } from '../types';

interface GoogleConnectionProps {
  state: GoogleCalendarState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const GoogleConnection: React.FC<GoogleConnectionProps> = ({ state, onConnect, onDisconnect }) => {
  return (
    <div className="connection-card google">
      <div className="card-content">
        <Mail className="card-icon" />
        <div className="card-info">
          <h4>Google Calendar</h4>
          <p>{state.isConnected ? state.email : 'Not connected'}</p>
        </div>
      </div>
      <button 
        className={`btn ${state.isConnected ? 'btn-secondary' : 'btn-primary'}`}
        onClick={state.isConnected ? onDisconnect : onConnect}
      >
        {state.isConnected ? <><Unlink size={16}/> Disconnect</> : <><Link2 size={16}/> Connect</>}
      </button>
    </div>
  );
};
