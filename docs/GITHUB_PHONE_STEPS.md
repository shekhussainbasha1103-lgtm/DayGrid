# Upload the project to GitHub from an Android phone

1. Download and extract `srm-one.zip` using your phone's Files app.
2. In your browser, sign in to GitHub and create a new repository named `srm-one`. Keep it private while developing.
3. On the repository page, choose **Add file → Upload files**.
4. Select the extracted project's files and folders. If mobile upload does not accept multiple folders, use GitHub's web interface to create files or use a trusted cloud IDE.
5. Commit the files to the repository root.
6. Verify that `App.js`, `package.json`, `app.json`, `babel.config.js`, and `README.md` are visible at the top level.
7. Do not upload passwords, API keys, `.env` files, SRM portal screenshots containing personal data, or real student records.

A GitHub repository does not itself produce an APK. Use Expo's cloud build flow described in README.md, or a compatible cloud development environment, to install dependencies and run EAS Build.
