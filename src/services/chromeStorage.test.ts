import { storageService } from './chromeStorage';

describe('storageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getState returns default state when nothing is stored', async () => {
    (chrome.storage.sync.get as jest.Mock).mockImplementation((_keys, callback) => {
      callback({});
    });

    const state = await storageService.getState();
    expect(state.leetcode.isConnected).toBe(false);
  });

  test('setState calls chrome.storage.sync.set', async () => {
    const mockState = { leetcode: { isConnected: true, username: 'test' } } as any;
    (chrome.storage.sync.set as jest.Mock).mockImplementation((_data, callback) => callback());

    await storageService.setState(mockState);
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ appState: mockState }, expect.any(Function));
  });

  test('onChanged registers a listener', () => {
    const callback = jest.fn();
    storageService.onChanged(callback);
    expect(chrome.storage.onChanged.addListener).toHaveBeenCalled();
    
    // Trigger callback
    const listener = (chrome.storage.onChanged.addListener as jest.Mock).mock.calls[0][0];
    listener({ appState: { newValue: 'new' } }, 'sync');
    expect(callback).toHaveBeenCalledWith('new');
  });
});
