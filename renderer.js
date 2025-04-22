console.log("Renderer JS Loaded");  // Debugging line to verify the script is loaded

// Start Button
document.getElementById('start').addEventListener('click', () => {
  console.log("Start button clicked");

  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 5;
  const autoStop = parseInt(document.getElementById('autoStop').value) || 0;
  const format = document.getElementById('format').value;

  console.log("Settings:", { minutes, seconds, autoStop, format });

  // Use electronAPI to update settings and start capture
  window.electronAPI.updateSettings({
    interval: minutes * 60 + seconds,
    autoStop,
    format
  });

  window.electronAPI.start();
  window.electronAPI.minimize();
});

// Stop Button
document.getElementById('stop').addEventListener('click', () => {
  console.log("Stop button clicked");
  window.electronAPI.stop();
});

// Choose Folder Button
document.getElementById('choose-folder').addEventListener('click', async () => {
  console.log("Choose folder clicked");
  const folder = await window.electronAPI.chooseFolder();
  if (folder) {
    console.log(`Selected folder: ${folder}`);
  }
});

// Export Button
document.getElementById('export').addEventListener('click', () => {
  console.log("Export button clicked");
  window.electronAPI.zipScreenshots();
});

// Quit Button
document.getElementById('quit').addEventListener('click', () => {
  console.log("Quit button clicked");
  window.electronAPI.quitApp();
});

// Dark Mode Toggle
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('bg-dark');
  document.body.classList.toggle('text-light');
});

// Listen for countdown updates
window.electronAPI.onCountdown((countdown) => {
  console.log("Countdown updated:", countdown);
  document.getElementById('countdown').textContent = `Next screenshot in: ${countdown}s`;
});

// Listen for new screenshots and update gallery
window.electronAPI.onNewScreenshot((filePath) => {
  console.log("New screenshot received:", filePath);
  const gallery = document.getElementById('gallery');
  const img = document.createElement('img');
  img.src = filePath;
  img.alt = 'Screenshot';
  img.classList.add('img-thumbnail', 'col-3');
  gallery.appendChild(img);
});

// Listen for folder change
window.electronAPI.onFolderChange((folderPath) => {
  console.log("Screenshot folder updated:", folderPath);
  document.getElementById('choose-folder').textContent = `📁 Folder: ${folderPath}`;
});
