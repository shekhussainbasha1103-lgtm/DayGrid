# Daygrid feature status

## Included in this starter
- New app identity: Daygrid.
- Campus tab with Monday–Saturday selectors.
- Breakfast / morning, lunch, evening snacks and dinner slots.
- Editable menu fields for each day/meal (local in this prototype; illustrative sample values only).
- Classroom timetable preview with unverified room/faculty placeholders.
- Campus map search shortcut.
- Faculty/advisor details area clearly marked as not verified.
- OD/ML planning checklist with date and reason preview; it does not submit a request or approve leave.
- Accent color choices and a text-size preference control.
- Daily reminder preview.
- Existing attendance calculator (target configurable; estimates classes needed or safely missable from the entered attendance counts).

## Still needs verified data / technical integration
- Official hostel/mess menu feed or approved way to keep menus current.
- Official student timetable including actual day order, periods, room, building and faculty assignment.
- Official faculty/advisor directory and room/office hours.
- Official campus map locations with verified building/floor/room pins.
- SRM-authorized attendance/marks/notice integration for live updates.
- Native scheduled notifications and push notifications (permissions, notification service, testing on a development/production build).
- Persistent user preferences and local storage.
- OD/ML official application workflow and policy confirmation.

## Important accuracy notes
- All sample menu text is labeled sample and must be replaced with the official menu.
- The app must not fabricate faculty names, staff IDs, classroom numbers, or building locations.
- OD/ML are not approval workflows; follow the official SRM process.
- Attendance calculations assume that each future class has equal weight and that the user attends/misses whole classes. Actual attendance rules and any OD/ML treatment should be confirmed with SRM.
- The app does not currently receive live SRM data and is not an official SRMIST product.
