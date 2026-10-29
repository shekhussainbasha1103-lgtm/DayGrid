# SRM One — Portal components and live-sync plan

## Important distinction
The SRMIST Student Portal and SRMIST student mobile app may expose different menus depending on campus, program, role, and enabled services. The public SRMIST Student Mobile App User Manual (version 1.0, last updated 29-Jul-2025) lists these example student features:

- Profile
- Online Assessment
- Fees and Miscellaneous Fee
- Holidays
- Assignment
- Announcement
- Bulletin Board
- Student Assessment
- Syllabus
- Session Plan
- Admissions
- Document
- Library
- Attendance
- Scheduler
- Mark Attendance (where enabled)

This is a verified example inventory, not a guarantee that every item is available in every student's HRD portal. SRM One should show a module only when it is available and authorized for the student's account. Do not invent portal sections that are not present.

## SRM One modules
- Home dashboard
- Profile (minimal; only needed fields)
- Attendance Guardian
- Timetable / Scheduler / Day Order
- Internal marks and Student Assessment
- Exam and online assessment information
- Announcements and Bulletin Board
- Assignments and deadlines
- Syllabus and Session Plan
- Fees and miscellaneous fees / receipts (read-only)
- Holidays and academic calendar
- Documents and Library links
- Admissions / student service links, when relevant
- Faculty directory from an authorized/public source
- Scholarship tracker
- Study planner and AI study tools
- Semester goals and grade estimates
- Data source + last-synced time

## How automatic updates should work
When a staff member changes a mark or publishes a notice, SRM One can reflect it automatically only if SRMIST provides an approved way to access the updated data (for example, an official API, authorized event/webhook feed, or approved SSO integration).

1. SRMIST IT / the portal owner confirms permission and documents the allowed fields and endpoints.
2. A secure backend syncs only those permitted fields on an approved schedule or receives authorized update events.
3. The backend validates the source, stores a timestamp and source reference, and avoids logging private values.
4. SRM One fetches the permitted data over HTTPS and shows a visible last-sync timestamp.
5. Optional notifications alert the student when a new notice or published mark is available.
6. If the sync fails, the app shows the last successful sync and labels the data as stale.

## What cannot safely be done from the URL alone
A portal URL does not grant API access or permission to read private records. This project must not scrape authenticated pages, ask students for SRM passwords, save passwords, bypass CAPTCHA/OTP/MFA, or defeat access controls. If SRMIST does not approve integration, SRM One can still provide calculators, planner, manually imported information, public notices, and a button to open the official portal.

## Data and privacy rules
- Marks, attendance, fees, documents, and profile data are private to the student.
- Never display another student's individual records.
- Class analytics must use approved aggregated/anonymized data with a minimum group size.
- Keep notification text discreet on a locked phone.
- Do not expose staff personal phone numbers or private information; use only official published work details.
- Include a "Report data mismatch" pathway and explain that the official portal remains authoritative.
