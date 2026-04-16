import { calculateReviewDates, REVIEW_INTERVALS } from './intervals';

describe('intervals utility', () => {
  test('calculateReviewDates correctly calculates dates based on intervals', () => {
    const baseDate = new Date('2024-01-01');
    const dates = calculateReviewDates(baseDate);
    
    expect(dates).toHaveLength(REVIEW_INTERVALS.length);
    expect(dates[0].getDate()).toBe(2); // +1 day
    expect(dates[1].getDate()).toBe(4); // +3 days
    expect(dates[2].getDate()).toBe(8); // +7 days
    expect(dates[3].getDate()).toBe(15); // +14 days
    expect(dates[4].getDate()).toBe(29); // +28 days
  });
});
