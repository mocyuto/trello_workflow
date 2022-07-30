const propCal = PropertiesService.getScriptProperties().getProperties();
const googleCalendarId = propCal.GOOGLE_CALENDAR_ID;

function createEvent(event: GoogleCalendarEvent) {
  const calendar = CalendarApp.getCalendarById(googleCalendarId);

  let calendarOption = {};
  if (event.description) {
    calendarOption['description'] = event.description;
  }
  if (event.location) {
    calendarOption['location'] = event.location;
  }
  if (event.isAllDay) {
    calendar.createAllDayEvent(event.title, event.date);
  } else {
    calendar.createEvent(event.title, event.startTime(), event.endTime(), calendarOption);
  }
}

function testAddEvent() {
  const event = new GoogleCalendarEvent(
    'test',
    new Date('2022-08-01T00:00:00+09:00'),
    11.0,
    15.0,
    'test',
  );
  createEvent(event);
}
