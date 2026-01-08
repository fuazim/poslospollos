"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;
function createWindow() {
    // Create the browser window
    mainWindow = new electron_1.BrowserWindow({
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
        electron_1.Menu.setApplicationMenu(null);
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
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Quit when all windows are closed
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});
//# sourceMappingURL=main.js.map