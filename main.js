const { app, Tray, BrowserWindow } = require('electron');

// Hide the app from the dock
app.dock.hide();

let window;
let tray;
const createWindow = () => {
  window = new BrowserWindow({
    width: 210,
    height: 210,
    frame: false,
    transparent: false,
    fullscreenable: false,
    resizable: false,
    'node-integration': false,
  });
  window.loadURL(`file://${__dirname}/index.html`);
};

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2,
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);

  window.show();
  window.focus();
  window.open = true;

  window.on('blur', () => {
    window.hide();
  });
};

// Tray is the icon that sits in the top toolbar of Mac windows.
const createTray = () => {
  tray = new Tray('./images/tomato16.png');
  tray.on('click', () => {
    if (window && window.open) {
      window.hide();
    }
    createWindow();
    showWindow();
  });
};

app.on('ready', () => {
  createTray();
});
