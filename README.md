# 🖼️ Electron Screenshot App

A lightweight, cross-platform desktop application built with **ElectronJS** that automatically captures your screen at custom intervals. Featuring a clean UI, folder selection, countdown display, dark mode, and ZIP export functionality — all packed into a sleek tray-based tool.

---

## 🚀 Features

✅ **Automatic Screenshots**
- Custom interval: minutes and seconds
- Optional screenshot capture limit

✅ **User Experience**
- Minimize to tray on startup
- Full tray menu: show window, start, stop, open folder, zip, quit
- System notifications with optional camera sound
- Dark/light mode toggle

✅ **Storage & Export**
- Select any save folder
- Saves with timestamped filenames
- Export all captured screenshots as a ZIP archive

✅ **Display & Feedback**
- Live countdown timer
- Preview latest screenshots
- Sound toggle (📸 snap effect)

✅ **Developer Friendly**
- Persistent settings (`settings.json`)
- Fully open-source
- Cross-platform (Windows-ready, macOS-compatible)
- Packaged with electron-builder

---

## 📁 Folder Structure
electron-screenshot-app/
├── assets/                 # App icons, sounds, etc.
│   └── icon.png
├── screenshots/            # Captured screenshots
├── index.html              # UI markup (Bootstrap 5)
├── style.css               # Optional custom styles
├── main.js                 # Electron main process
├── preload.js              # Context bridge for IPC
├── renderer.js             # Frontend logic
├── settings.json           # User preferences
├── package.json            # Project config & metadata
└── .gitignore

🛠️ Setup Instructions

1. Clone the repository
git clone https://github.com/ivocreates/electron-screenshot-app.git
cd electron-screenshot-app

3. Install dependencies
npm install

5. Start in development
npm start


🧪 Available Commands

Command	Description
npm start	Run app in development mode
npm run pack	Package app using electron-builder
✅ Output files will be created in the dist/ folder.

📦 Packaging for Windows
Make sure the following is true in package.json:

electron and electron-builder are in devDependencies

build field exists

Then run:

npm run pack
Your .exe installer will be inside dist/.

🖱️ Usage Guide
Launch the app (starts in tray by default)

Set interval in minutes & seconds

(Optional) Set a capture limit

Choose format: PNG / JPG

Select a save folder

Click Start — the app begins capturing screenshots

Watch live countdown, view recent previews

Click Zip & Export to save all as a .zip

Use the tray menu to control the app

👤 Creator
Made with Dedication by Ivo Pereira

🔗 GitHub: github.com/ivocreates

🌐 Portfolio: ivocreates.site

💼 LinkedIn: linkedin.com/in/pereira-ivo

✍️ Dev Blog: dev.to/ivocreates

📰 Medium: medium.com/@ivocreates

📝 License
MIT License — Feel free to use, modify, and share.
Please credit the author if publishing publicly.
