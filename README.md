# Google App Script Calendar Sync

This project allows you to sync events in two calendars (e.g. `Work Calendar` and `Personal Calendar`).

## How to use
1. Share and subscribe your calendars with each other; <sup>(You can follow instructions in Google Help for [Share](https://support.google.com/calendar/answer/37082#zippy=%2Csee-how-to-share-your-calendar-with-a-person-or-group) and [Subscribe](https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Csee-how-to-subscribe-to-a-calendar-you-dont-own)).</sup>
2. Create a new project in [Google Apps Script](https://script.google.com/);
3. Create two files with content in [`main.gs`](main.gs) and [`config.gs`](config.gs);
4. In `config.gs` file add the Calendar Id you want to keep synced. <sup>(e.g. your-email@gmail.com)</sup>

## Habits
You can create <b>Habits</b> (e.g. `Lunch Time`, `Focus Time`) that will sync, but the script will keep the original title of the event.

To define your habits, just open the `config.gs` file and update the habits array.

> ```js
> const habits = ["🍝 Lunch Time", "🧐 Focus Time"];
> ```

With the habits setup done, just create events in your calendar with the same title you defined in the habits array.

## Automated sync

To keep the calendars in sync you need to create a trigger that will run the script.

In the triggers tab in your Google Apps Script project, add a new trigger to run `StartSync`.

You can select the options you prefer, but it is recommended that you use the options as follows:

> Select event source: `Time-driven` <br/>
> Select type of time based trigger: `Minutes timer` <br/> 
> Select minute interval: `Every 10 minutes` <sup>Or greater</sup>

## Thanks

This script is created based on [this gist file](https://gist.github.com/ttrahan/a88febc0538315b05346f4e3b35997f2).
