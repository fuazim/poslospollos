"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods to the renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // Print receipt functionality (stub for now)
    printReceipt: (data) => electron_1.ipcRenderer.invoke('print-receipt', data),
    // App control
    reloadApp: () => electron_1.ipcRenderer.invoke('reload-app'),
    // Platform info
    platform: process.platform,
});
//# sourceMappingURL=preload.js.map