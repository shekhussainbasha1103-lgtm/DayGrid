# Daygrid — student profile and portal redesign

## Identity
- App name: Daygrid
- Visual direction: futuristic, comic-inspired, rounded dashboard cards, vivid accent palette, dark/light mode, custom presentation rather than copying the student portal website.
- This is a student companion concept, not an official SRMIST app.

## Personal campus profile
The Campus tab now includes fields for:
- Daygrid / programme
- Department / branch
- Campus
- Area / zone
- Hostel name
- Hostel block / wing
- Floor
- Hostel room number
- Mess / dining hall

These are editable prototype fields. They are not currently synced to SRM records and may not persist after the app restarts. Room numbers are private and should not be exposed publicly.

## Portal modules shown as redesigned tiles
- Attendance
- Marks and exams
- Announcements
- Assignments
- Timetable and scheduler
- Syllabus and session plan
- Fees and receipts
- Documents
- Library
- Holidays / academic calendar
- Student profile
- Online assessment

This is an example list based on commonly documented student-portal/app modules. Exact modules vary by account, programme and campus. Enable only verified, authorized modules.

## Automatic updates
Daygrid may mirror a permitted SRM portal record only through an approved API, official integration, or another method explicitly authorized by SRMIST. The current project does not have live portal access. It must not collect SRM passwords/OTPs, bypass login controls, or scrape private pages.

## Visual transformation
Daygrid should not clone portal HTML or reproduce its website layout. The mobile app presents permitted information in redesigned cards, icon tiles, progress rings, timelines, notifications, search, and student-friendly navigation. Values must remain faithful to the official source, and the app should show source and last-sync time.

## Validations and statuses
Potential portal statuses should be modeled only when the official source exposes them, for example:
- document uploaded / pending / verified / rejected
- fee due / paid / receipt available
- assignment open / submitted / deadline passed
- assessment scheduled / available / completed
- notice new / read
- attendance below target / at target
- leave request draft / submitted / approved / rejected (only if official workflow is integrated)

Do not invent a validation or approval status. Display “Not available from official source” when the portal does not expose it.
