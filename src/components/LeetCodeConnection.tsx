import * as React from 'react';
import { Code2, Link2, Unlink } from 'lucide-react';
import { LeetCodeState } from '../types';

interface LeetCodeConnectionProps {
  state: LeetCodeState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const LeetCodeConnection: React.FC<LeetCodeConnectionProps> = ({ state, onConnect, onDisconnect }) => {
  return (
    <div className="connection-card leetcode">
      <div className="card-content">
        <Code2 className="card-icon" />
        <div className="card-info">
          <h4>LeetCode</h4>
          <p>{state.isConnected ? state.username : 'Not connected'}</p>
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
