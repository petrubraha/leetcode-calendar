import { Submission } from '../types';
import { calculateReviewDates } from '../utils/intervals';
import { googleCalendarService } from '../services/googleCalendar';
import { storageService } from '../services/chromeStorage';

// Listen for submission requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (
      details.method === 'POST' &&
      details.url.startsWith('https://leetcode.com/problems/') &&
      details.url.includes('/submit/')
    ) {
      const questionSlug = details.url.match(/\/problems\/(.*)\/submit/)?.[1] ?? null;
      if (!questionSlug) return;

      // Notify content script to fetch submission results
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          setTimeout(() => {
            chrome.tabs.sendMessage(tabs[0].id!, { 
              type: 'LEETCODE_SUBMISSION_DETECTED', 
              payload: { questionSlug } 
            });
          }, 5000); // Wait for LeetCode to process
        }
      });
    }
  },
  { urls: ['https://leetcode.com/problems/*/submit/'] }
);

// Handle messages from content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SUCCESSFUL_SUBMISSION') {
    const submission: Submission = message.payload;
    console.log('Submission detected:', submission);
    // Here we would call the Google Calendar service to create events
    handleSuccessfulSubmission(submission);
  }
});

async function handleSuccessfulSubmission(submission: Submission) {
  const state = await storageService.getState();
  if (!state.google.isConnected || !state.selectedCalendarId) {
    console.warn('Google Calendar not configured, skipping event creation');
    return;
  }

  const reviewDates = calculateReviewDates(new Date(submission.timestamp * 1000));
  const problemUrl = `https://leetcode.com/problems/${submission.questionSlug}/`;

  for (let i = 0; i < reviewDates.length; i++) {
    await googleCalendarService.createEvent(
      state.selectedCalendarId,
      `Review: ${submission.questionSlug} (Session ${i + 1})`,
      reviewDates[i],
      `Solve the problem again: ${problemUrl}`
    );
  }
}
