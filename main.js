const { app, BrowserWindow, Tray, Menu, dialog, Notification, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const screenshot = require('screenshot-desktop');
const AdmZip = require('adm-zip'); // To zip the screenshots

let tray = null;
let win = null;
let intervalId = null;
let countdown = 0;
let screenshotCounter = 0;

let settings = {
  folder: path.join(__dirname, 'screenshots'),
  format: 'png',
  interval: 5, // in seconds
  autoStop: 0 // 0 = no auto stop
};

// Path for storing settings
const settingsPath = path.join(__dirname, 'settings.json');

// Check if settings.json exists and load settings
if (fs.existsSync(settingsPath)) {
  settings = { ...settings, ...JSON.parse(fs.readFileSync(settingsPath)) };
} else {
  console.log('settings.json not found, using default settings.');
}

// Save settings to settings.json
function saveSettings() {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log('Settings saved successfully');
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Create the main window
function createWindow() {
  try {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets/icon.png'),
      show: true, // Ensure the window is visible immediately
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false
      }
    });

    // Load the HTML file for the UI
    win.loadFile('index.html').then(() => {
      console.log('index.html loaded successfully');
    }).catch((error) => {
      console.error('Error loading index.html:', error);
    });

    // Ensure the window is shown after loading
    win.once('ready-to-show', () => {
      console.log('Window is ready to show');
      win.show();
    });

    // Handle window close event (hide window instead of closing)
    win.on('close', (e) => {
      e.preventDefault();
      win.hide();
    });

    console.log('Window created successfully');
  } catch (error) {
    console.error('Error creating window:', error);
  }
}

// Take a screenshot with a formatted filename (timestamp)
function takeScreenshot() {
  try {
    if (!fs.existsSync(settings.folder)) fs.mkdirSync(settings.folder, { recursive: true });

    const timestamp = new Date();
    const dateString = timestamp.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const timeString = timestamp.toTimeString().slice(0, 5).replace(':', ''); // HHMM
    const fileName = `screenshot_${dateString}_${timeString}.${settings.format}`;
    const filePath = path.join(settings.folder, fileName);

    screenshot({ format: settings.format })
      .then((img) => {
        fs.writeFileSync(filePath, img);
        notify(`📸 Screenshot saved`);
        win?.webContents.send('new-screenshot', filePath);

        screenshotCounter++;
        if (settings.autoStop > 0 && screenshotCounter >= settings.autoStop) {
          stopCapture();
          notify(`✅ Auto-stopped after ${screenshotCounter} screenshots`);
          screenshotCounter = 0;
        }
      })
      .catch(err => {
        console.error('Error taking screenshot:', err);
        notify(`❌ Error: ${err.message}`);
      });
  } catch (error) {
    console.error('Error in takeScreenshot:', error);
  }
}

// Display notification to the user
function notify(message) {
  try {
    new Notification({ title: 'Screenshot App', body: message }).show();
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

// Start the screenshot capture process
function startCapture() {
  if (intervalId) return; // Prevent starting multiple captures

  countdown = settings.interval;
  screenshotCounter = 0;
  takeScreenshot(); // Immediate first screenshot

  intervalId = setInterval(() => {
    if (--countdown <= 0) {
      takeScreenshot();
      countdown = settings.interval;
    }
    win?.webContents.send('countdown', countdown);
  }, 1000);

  console.log('Capture started');
}

// Stop the screenshot capture process
function stopCapture() {
  try {
    clearInterval(intervalId);
    intervalId = null;
    countdown = 0;
    console.log('Capture stopped');
  } catch (error) {
    console.error('Error stopping capture:', error);
  }
}

// Zip all screenshots in the folder
function zipScreenshots() {
  try {
    const zip = new AdmZip();
    const files = fs.readdirSync(settings.folder);

    files.forEach(file => {
      const fullPath = path.join(settings.folder, file);
      if (fs.lstatSync(fullPath).isFile()) {
        zip.addLocalFile(fullPath);
      }
    });

    const zipPath = path.join(settings.folder, `screenshots_${Date.now()}.zip`);
    zip.writeZip(zipPath);
    shell.showItemInFolder(zipPath);
    notify('🗜️ Screenshots zipped');
    console.log(`Screenshots zipped: ${zipPath}`);
  } catch (error) {
    console.error('Error zipping screenshots:', error);
  }
}

// --- App Lifecycle --- 
app.whenReady().then(() => {
  try {
    createWindow();

    // Create tray icon and context menu
    tray = new Tray(path.join(__dirname, 'assets/icon.png'));
    tray.setToolTip('Screenshot App');

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click: () => win.show() },
      { label: 'Start Capture', click: startCapture },
      { label: 'Stop Capture', click: stopCapture },
      { label: 'Open Folder', click: () => shell.openPath(settings.folder) },
      { label: 'Quit', click: () => {
        stopCapture();
        app.exit();
      }}
    ]);

    tray.setContextMenu(contextMenu);
    console.log('App is ready and tray is created');
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
});

// Prevent app from quitting when all windows are closed
app.on('window-all-closed', (e) => {
  e.preventDefault();
});

// Handle IPC messages to choose folder, update settings, start, stop, zip, and quit
ipcMain.handle('choose-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!result.canceled) {
    settings.folder = result.filePaths[0];
    saveSettings();
    win?.webContents.send('update-folder-path', settings.folder);
    return settings.folder;
  }
});

ipcMain.on('update-settings', (_, newSettings) => {
  settings = { ...settings, ...newSettings };
  saveSettings();
});

ipcMain.on('start', startCapture);
ipcMain.on('stop', stopCapture);
ipcMain.on('zipScreenshots', zipScreenshots);
ipcMain.on('quitApp', () => {
  stopCapture();
  app.quit();
});
