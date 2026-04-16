import { ConfigurationState } from '../types';

const DEFAULT_STATE: ConfigurationState = {
  leetcode: { isConnected: false, username: null },
  google: { isConnected: false, email: null },
  selectedCalendarId: null,
};

export const storageService = {
  async getState(): Promise<ConfigurationState> {
    return new Promise((resolve) => {
      if (typeof chrome === 'undefined' || !chrome.storage) {
        const local = localStorage.getItem('appState');
        resolve(local ? JSON.parse(local) : DEFAULT_STATE);
        return;
      }
      chrome.storage.sync.get(['appState'], (result) => {
        resolve(result.appState || DEFAULT_STATE);
      });
    });
  },

  async setState(state: ConfigurationState): Promise<void> {
    return new Promise((resolve) => {
      if (typeof chrome === 'undefined' || !chrome.storage) {
        localStorage.setItem('appState', JSON.stringify(state));
        resolve();
        return;
      }
      chrome.storage.sync.set({ appState: state }, () => {
        resolve();
      });
    });
  },

  onChanged(callback: (newState: ConfigurationState) => void) {
    if (typeof chrome === 'undefined' || !chrome.storage) {
      window.addEventListener('storage', (e) => {
        if (e.key === 'appState' && e.newValue) {
          callback(JSON.parse(e.newValue));
        }
      });
      return;
    }
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'sync' && changes.appState) {
        callback(changes.appState.newValue);
      }
    });
  }
};
