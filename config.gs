const defaultCalendar = CalendarApp.getDefaultCalendar();
const calendarToSync = CalendarApp.getCalendarById('calendar-id-to-sync');
const daysNumberToSync = 30;

const habits = ["🍝 Lunch Time"];
const workEventTitle = "💻 Work commitment";
const personalEventTitle = "🏡 Personal commitment";

const syncs = [
  { primaryCalendar: calendarToSync, secondaryCalendar: defaultCalendar, eventTitle: workEventTitle },
  { primaryCalendar: defaultCalendar, secondaryCalendar: calendarToSync, eventTitle: personalEventTitle },
]
