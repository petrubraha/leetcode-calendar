import * as React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface StatusWidgetProps {
  isConfigured: boolean;
  errors: string[];
}

export const StatusWidget: React.FC<StatusWidgetProps> = ({ isConfigured, errors }) => {
  return (
    <div className={`status-widget ${isConfigured ? 'status-success' : 'status-pending'}`}>
      <div className="status-header">
        {isConfigured ? (
          <CheckCircle2 className="status-icon" />
        ) : (
          <AlertCircle className="status-icon" />
        )}
        <h3>{isConfigured ? 'Ready to Sync' : 'Configuration Required'}</h3>
      </div>
      
      {!isConfigured && errors.length > 0 && (
        <ul className="status-errors">
          {errors.map((error, i) => (
            <li key={i}><XCircle size={14} /> {error}</li>
          ))}
        </ul>
      )}
      
      <p className="status-message">
        {isConfigured 
          ? 'Your LeetCode submissions will now be synced to your calendar.'
          : 'Complete the steps below to start tracking your progress.'}
      </p>
    </div>
  );
};
