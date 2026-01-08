import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 1920,
        fullscreen: !isDev, // Full screen in production
        frame: isDev, // Show frame only in dev mode
        kiosk: !isDev, // Kiosk mode in production
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: isDev,
        },
    });

    // Hide menu in production
    if (!isDev) {
        Menu.setApplicationMenu(null);
    }

    // Load the app
    const startUrl = isDev
        ? `http://localhost:${PORT}`
        : `file://${path.join(__dirname, '../out/index.html')}`;

    mainWindow.loadURL(startUrl);

    // Open DevTools in development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Handle window close
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle crashes - reload the app
    mainWindow.webContents.on('render-process-gone', (_event, details) => {
        console.log('Renderer process gone:', details.reason);
        if (mainWindow && details.reason !== 'clean-exit') {
            mainWindow.reload();
        }
    });

    // Handle unresponsive window
    mainWindow.on('unresponsive', () => {
        console.log('Window unresponsive, reloading...');
        if (mainWindow) {
            mainWindow.reload();
        }
    });
}

// Create window when Electron is ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});
