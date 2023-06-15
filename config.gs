const defaultCalendar = CalendarApp.getDefaultCalendar();
const calendarToSync = CalendarApp.getCalendarById('henrique.coutu69@gmail.com');
const daysNumberToSync = 30;

const habits = ["🍝 Lunch Time"];
const workEventTitle = "💻 Work commitment";
const personalEventTitle = "🏡 Personal commitment [OOO]";

const syncs = [
  { primaryCalendar: calendarToSync, secondaryCalendar: defaultCalendar, eventTitle: workEventTitle },
  { primaryCalendar: defaultCalendar, secondaryCalendar: calendarToSync, eventTitle: personalEventTitle },
]
