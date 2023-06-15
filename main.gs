function CalendarSync({ primaryCalendar, secondaryCalendar, eventTitle }) {
  const today=new Date();
  const enddate=new Date();
  enddate.setDate(today.getDate() + daysNumberToSync);

  const primaryCalendarEvents = primaryCalendar.getEvents(today, enddate);
  const secondaryCalendarEvents = secondaryCalendar.getEvents(today, enddate);
  
  let stat=1;
  let evi, existingEvent; 
  const primaryEventsFiltered = []; // to contain primary calendar events that were previously created from secondary calendar
  const primaryEventsUpdated = []; // to contain primary calendar events that were updated from secondary calendar
  const primaryEventsCreated = []; // to contain primary calendar events that were created from secondary calendar
  const primaryEventsDeleted = []; // to contain primary calendar events previously created that have been deleted from secondary calendar

  Logger.log('Number of primaryEvents: ' + primaryCalendarEvents.length);  
  Logger.log('Number of secondaryEvents: ' + secondaryCalendarEvents.length);
  
  // create filtered list of existing primary calendar events that were previously created from the secondary calendar
  for (pev in primaryCalendarEvents)
  {
    var pEvent = primaryCalendarEvents[pev];
    const isSyncedHabit = habits.includes(pEvent.getTitle()) && pEvent.getDescription().includes("Calendar Sync")
    if (pEvent.getTitle() == eventTitle || isSyncedHabit)
    { primaryEventsFiltered.push(pEvent); }
  }
  
  // process all events in secondary calendar
  for (sev in secondaryCalendarEvents)
  {
    stat=1;
    evi=secondaryCalendarEvents[sev];

    if(evi.getDescription().includes('Calendar Sync')){
      continue;
    }
    
    // if the secondary event has already been blocked in the primary calendar, update it
    for (existingEvent in primaryEventsFiltered)
      {
        var pEvent = primaryEventsFiltered[existingEvent];
        var secondaryTitle = evi.getTitle();
        var secondaryDesc = evi.getDescription();
        if ((pEvent.getStartTime().getTime()==evi.getStartTime().getTime()) && (pEvent.getEndTime().getTime()==evi.getEndTime().getTime()))
        {
          stat=0;
          if(!habits.includes(pEvent.getTitle())){
            pEvent.setTitle(eventTitle);
          }
          pEvent.setDescription('Event created automatically by Calendar Sync\n\n\n' + secondaryTitle + '\n\n' + secondaryDesc);
          pEvent.setVisibility(CalendarApp.Visibility.DEFAULT); // set blocked time as private appointments in work calendar
          primaryEventsUpdated.push(pEvent.getId());
          Logger.log('PRIMARY EVENT UPDATED'
                     + '\nprimaryId: ' + pEvent.getId() + ' \nprimaryTitle: ' + pEvent.getTitle() + ' \nprimaryDesc: ' + pEvent.getDescription());
        } 
      }

    if (stat==0) continue;    
    
    var d = evi.getStartTime();
    var n = d.getDay();

    if (evi.isAllDayEvent())
    {
      continue; // Do nothing if the event is an all-day or multi-day event. This script only syncs hour-based events
    }
    else if (n==1 || n==2 || n==3 || n==4 || n==5) // skip weekends. Delete this if you want to include weekends
    // if the secondary event does not exist in the primary calendar, create it
    {
      var newEvent = primaryCalendar.createEvent(eventTitle,evi.getStartTime(),evi.getEndTime()); // change the Booked text to whatever you would like your merged event titles to be
      // alternative version below that copies the exact secondary event information into the primary calendar event
      // var newEvent = primaryCal.createEvent(evi.getTitle(),evi.getStartTime(),evi.getEndTime(), {location: evi.getLocation(), description: evi.getDescription()});
      if(habits.includes(evi.getTitle())){
        newEvent.setTitle(evi.getTitle());
      }
      newEvent.setDescription('Event created automatically by Calendar Sync\n\n\n' + evi.getTitle() + '\n\n' + evi.getDescription());
      newEvent.setVisibility(CalendarApp.Visibility.DEFAULT); // set blocked time as private appointments in work calendar
      newEvent.removeAllReminders(); // so you don't get double notifications. Delete this if you want to keep the default reminders for your newly created primary calendar events
      primaryEventsCreated.push(newEvent.getId());
      Logger.log('PRIMARY EVENT CREATED'
                 + '\nprimaryId: ' + newEvent.getId() + '\nprimaryTitle: ' + newEvent.getTitle() + '\nprimaryDesc ' + newEvent.getDescription() + '\n');
    }
  }

  // if a primary event previously created no longer exists in the secondary calendar, delete it
  for (pev in primaryEventsFiltered)
  {
    var pevIsUpdatedIndex = primaryEventsUpdated.indexOf(primaryEventsFiltered[pev].getId());
    if (pevIsUpdatedIndex == -1)
    { 
      var pevIdToDelete = primaryEventsFiltered[pev].getId();
      Logger.log(pevIdToDelete + ' deleted');
      primaryEventsDeleted.push(pevIdToDelete);
      primaryEventsFiltered[pev].deleteEvent();
    }
  }  



  Logger.log('Primary events previously created: ' + primaryEventsFiltered.length);
  Logger.log('Primary events updated: ' + primaryEventsUpdated.length);
  Logger.log('Primary events deleted: ' + primaryEventsDeleted.length);
  Logger.log('Primary events created: ' + primaryEventsCreated.length);
}  

function SyncWorkToPersonal () {
  CalendarSync({
    primaryCalendar: calendarToSync,
    secondaryCalendar: defaultCalendar,
    eventTitle: workEventTitle
  });
}

function SyncPersonalToWork () {
  CalendarSync({
    primaryCalendar: defaultCalendar,
    secondaryCalendar: calendarToSync,
    eventTitle: personalEventTitle
  });
}
