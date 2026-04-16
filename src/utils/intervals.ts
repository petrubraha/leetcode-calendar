export const REVIEW_INTERVALS = [1, 3, 7, 14, 28];

export const calculateReviewDates = (baseDate: Date): Date[] => {
  return REVIEW_INTERVALS.map(days => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + days);
    return date;
  });
};
