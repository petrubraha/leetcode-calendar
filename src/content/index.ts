import { leetcodeService } from '../services/leetcode';

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'LEETCODE_SUBMISSION_DETECTED') {
    const { questionSlug } = message.payload;
    
    // Fetch submission details from the page or LeetCode API
    const submission = await leetcodeService.getLatestSubmission(questionSlug);
    
    if (submission) {
      chrome.runtime.sendMessage({
        type: 'SUCCESSFUL_SUBMISSION',
        payload: submission
      });
    }
  }
});
