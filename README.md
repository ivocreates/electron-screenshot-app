🖼️ Electron Screenshot App
A lightweight and cross-platform desktop app built with Electron that captures desktop screenshots at custom intervals, supports folder selection, countdown display, dark mode toggle, and export of screenshots as a ZIP archive.

🚀 Features
📸 Take automatic screenshots at custom intervals (minutes & seconds)

⏹️ Auto stop after a defined duration (optional)

🌗 Light/Dark mode toggle

📁 Choose screenshot save folder

🧾 Export all screenshots as a ZIP

🖼️ View recent screenshot previews in-app

🔔 System notifications for actions

🛑 Minimize to tray with full tray menu support

🧠 Settings persistence

🪟 Fully packaged for Windows

📂 Folder Structure
electron-screenshot-app/
├── assets/
│   └── icon.png              # App icon used in window and tray
├── screenshots/              # Folder where screenshots are saved (default)
├── index.html                # UI layout (Bootstrap-based)
├── style.css                 # Custom styles
├── main.js                   # Main Electron process
├── preload.js                # Preload script for secure communication
├── renderer.js               # Renderer process JS for UI logic
├── settings.json             # Saved user settings (auto-created)
├── package.json              # Project config and scripts
└── .gitignore                # Ignored files for version control

🛠️ Setup Instructions
1. Clone the repository

git clone https://github.com/ivocreates/electron-screenshot-app.git
cd electron-screenshot-app

2. Install dependencies
npm install

3. Start in development
npm start

🧪 Available Commands

Command	Description
npm start	Run app in development mode
npm run pack	Package the app using electron-builder (creates installer)
npm run make	Build the app (if using Electron Forge)

📦 Packaging for Windows
This project supports electron-builder. Make sure electron is only in devDependencies.

npm run pack
The packaged .exe and installer will be created inside the dist/ folder.

🖱️ Usage Guide
Launch the app (minimizes to tray by default)

Choose screenshot interval in minutes & seconds

Set optional auto-stop time (in minutes)

Choose desired image format: PNG or JPG

Choose a folder to save screenshots (or use default)

Click Start to begin automatic captures

View previews and countdown timer in the UI

Click Zip & Export to save all images as a ZIP

Use tray menu to show/hide/start/stop/quit

🧑‍💻 Creator
Ivo Pereira
🔗 GitHub
🌐 Portfolio
💼 LinkedIn

📝 License
MIT License - Free to use and modify. Please credit the creator if shared publicly.