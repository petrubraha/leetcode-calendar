import { Submission } from '../types';

export const leetcodeService = {
  async getLatestSubmission(questionSlug: string): Promise<Submission | null> {
    // In a real implementation, this would fetch from LeetCode API or DOM
    // For now, returning a mock successful submission
    return {
      questionSlug,
      timestamp: Math.floor(Date.now() / 1000)
    };
  },

  async checkConnection(): Promise<boolean> {
    // Check if user is logged in to LeetCode
    return true;
  }
};
