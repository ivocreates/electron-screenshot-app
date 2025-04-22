const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  chooseFolder: () => ipcRenderer.invoke('choose-folder'),
  updateSettings: (settings) => ipcRenderer.send('update-settings', settings),
  start: () => ipcRenderer.send('start'),
  stop: () => ipcRenderer.send('stop'),
  zipScreenshots: () => ipcRenderer.send('zipScreenshots'),
  quitApp: () => ipcRenderer.send('quitApp'),
  onCountdown: (callback) => ipcRenderer.on('countdown', (_, val) => callback(val)),
  onNewScreenshot: (callback) => ipcRenderer.on('new-screenshot', (_, path) => callback(path)),
});
