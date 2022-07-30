class GoogleCalendarEvent {
  title: string;
  date: Date;
  startHour: number;
  endHour: number;
  description?: string;
  location?: string;
  isAllDay: boolean;
  constructor(title: string, date: Date, startHour: number, endHour: number, description?: string, isAllDay: boolean = false) {
    this.title = title;
    this.date = date;
    this.startHour = startHour;
    this.endHour = endHour;
    this.description = description;
    this.isAllDay = isAllDay;
  }

  setLocation(location: string) {
    this.location = location;
  }

  startTime(): Date {
    const date = new Date(this.date);
    date.setHours(this.startHour);
    return date;
  }
  endTime(): Date {
    const date = new Date(this.date);
    date.setHours(this.endHour);
    return date;
  }
}
