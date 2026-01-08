import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Print receipt functionality (stub for now)
    printReceipt: (data: unknown) => ipcRenderer.invoke('print-receipt', data),

    // App control
    reloadApp: () => ipcRenderer.invoke('reload-app'),

    // Platform info
    platform: process.platform,
});

// Type declaration for the exposed API
declare global {
    interface Window {
        electronAPI: {
            printReceipt: (data: unknown) => Promise<void>;
            reloadApp: () => Promise<void>;
            platform: string;
        };
    }
}
