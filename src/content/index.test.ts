import './index';
import { leetcodeService } from '../services/leetcode';

jest.mock('../services/leetcode');

describe('content script', () => {
  test('listens for LEETCODE_SUBMISSION_DETECTED and reports success', async () => {
    const listener = (chrome.runtime.onMessage.addListener as jest.Mock).mock.calls[0][0];
    
    (leetcodeService.getLatestSubmission as jest.Mock).mockResolvedValue({
      questionSlug: 'test',
      timestamp: 12345
    });

    await listener({
      type: 'LEETCODE_SUBMISSION_DETECTED',
      payload: { questionSlug: 'test' }
    });

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'SUCCESSFUL_SUBMISSION',
      payload: { questionSlug: 'test', timestamp: 12345 }
    });
  });
});
