import './index'; // This will execute the background script and register listeners

describe('background script', () => {
  test('registers onCompleted listener', () => {
    expect(chrome.webRequest.onCompleted.addListener).toHaveBeenCalled();
  });

  test('detects leetcode submission and sends message to content script', () => {
    jest.useFakeTimers();
    const listener = (chrome.webRequest.onCompleted.addListener as jest.Mock).mock.calls[0][0];
    
    (chrome.tabs.query as jest.Mock).mockImplementation((_query, callback) => {
      callback([{ id: 123 }]);
    });

    // Simulate a successful submission request
    listener({
      method: 'POST',
      url: 'https://leetcode.com/problems/two-sum/submit/',
    });

    // Fast-forward the 5s timer
    jest.advanceTimersByTime(5000);

    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(123, {
      type: 'LEETCODE_SUBMISSION_DETECTED',
      payload: { questionSlug: 'two-sum' }
    });
    
    jest.useRealTimers();
  });
});
