# Daygrid — Student Super App (starter project)

Daygrid is an Android-first Expo / React Native starter for an SRMIST student dashboard. It includes working demo calculators and navigation, with sample data clearly marked. It does **not** connect to SRM systems yet.

## Included features
- Light and dark theme toggle
- Home dashboard with attendance, GPA estimate, freshness label, day-order and quick links
- Attendance Guardian: classes attended/conducted, target percentage, classes to attend or safely miss
- Timetable and day-order screen (sample schedule; edit with your official calendar)
- Internal/external what-if marks calculator
- SGPA estimate calculator using entered credits and grade points
- Academic risk alerts and study planner
- Semester goal tracker
- Privacy-first class analytics placeholder (no other students' records)
- Scholarship checklist and fee overview
- Faculty directory placeholder
- AI study tools placeholder
- Official portal link launcher (opens browser; no password collection)

## Daygrid added features
The Campus tab includes a six-day mess-menu editor, classroom lookup placeholder, faculty/advisor verification area, OD/ML request checklist, accent-color choices, text-size preference, and a daily reminder preview. Menus, rooms, faculty assignments and reminders are not live/official until configured with verified sources and notification support.

## Portal modules and automatic updates
See `docs/PORTAL_COMPONENTS_AND_SYNC.md` for the example portal component inventory and the safe architecture required for automatic mark/notice updates.

## Important real-data limitation
No SRM login, internal marks, attendance, timetable, staff directory, fee ledger or scholarship feed is connected. The app uses illustrative sample data and calculators. For live records, first obtain written authorization and the official API/SSO integration requirements from SRMIST IT / the relevant department. Use an approved OAuth/SSO flow or official API. Never ask users to enter their SRM password into this app, store it, automate CAPTCHA/OTP, or bypass access controls. Display source and last-sync time for every imported dataset.

## Run on an Android phone (no local PC required)
1. Create a GitHub account if you do not already have one.
2. Create a **private** repository named `srm-one`.
3. Upload all files from this ZIP (including `App.js`, `package.json`, `app.json`, `babel.config.js`, and `assets/`) to the repository root.
4. Open `https://snack.expo.dev/` in your phone browser for a quick preview. For a complete cloud build, see the EAS steps below.
5. For an installable APK, Expo's EAS Build needs a compatible Expo account and project setup. A computer is not required if you use the GitHub web editor / Expo's cloud workflow, but initial setup may be easier on a PC. Do not upload secrets or university credentials to GitHub.

## Build an APK using Expo EAS
Expo SDK 52 is used for a starter baseline. Check Expo's current upgrade guidance before a production release.
1. Install Node.js and Git on a computer, or use a trusted cloud development environment.
2. Download/clone the repository.
3. Run:
   ```bash
   npm install
   npx expo-doctor
   npx expo install --check
   ```
4. Install EAS CLI and sign in:
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```
5. For an APK profile, create `eas.json`:
   ```json
   {
     "build": {
       "preview": {
         "distribution": "internal",
         "android": { "buildType": "apk" }
       },
       "production": {
         "android": { "buildType": "app-bundle" }
       }
     }
   }
   ```
6. Run `eas build -p android --profile preview`. When the cloud build completes, use the EAS build page's download link to download the APK to your phone. The first build may require accepting prompts and configuring Android signing.
7. Test only with demo data until an approved SRM integration is implemented.

## Customizing the sample timetable
Open `App.js` and edit `SAMPLE_TIMETABLE`, `SAMPLE_SUBJECTS`, and `SAMPLE_SCHOLARSHIPS`. The example day order is not authoritative. Update it from the current official SRM academic calendar.

## Suggested next integration milestone
Ask SRMIST for:
- Official student-app / SSO integration documentation and permission for a third-party app
- Approved API scopes for attendance, marks, timetable, faculty and fees
- Whether there is a sandbox/test account or anonymized sample payload
- Data privacy, retention, branding and distribution requirements

Keep any future API keys on a backend, not in the mobile app. Use per-user authorization, least privilege, audit logs, encryption in transit, and an explicit logout/revocation path.


## Latest screenshot-inspired modules
See `docs/DAYGRID_SCREENSHOT_FEATURES.md` for the added Updates timeline, CGPA/SGPA calculator guidance, Events & Clubs, Notes & Exam Timetable, and eCurriculum solver prototype screens.
