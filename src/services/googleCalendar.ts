import { Calendar } from '../types';

export const googleCalendarService = {
  async getCalendars(): Promise<Calendar[]> {
    return [
      { id: 'primary', summary: 'Primary Calendar' }
    ];
  },

  async createEvent(calendarId: string, title: string, date: Date, description: string): Promise<void> {
    console.log(`Event created in ${calendarId}: ${title} on ${date.toISOString()}`);
  }
};
