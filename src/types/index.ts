export interface LeetCodeState {
  isConnected: boolean;
  username: string | null;
}

export interface GoogleCalendarState {
  isConnected: boolean;
  email: string | null;
}

export interface Calendar {
  id: string;
  summary: string;
}

export interface ConfigurationState {
  leetcode: LeetCodeState;
  google: GoogleCalendarState;
  selectedCalendarId: string | null;
}

export interface Submission {
  questionSlug: string;
  timestamp: number;
}
