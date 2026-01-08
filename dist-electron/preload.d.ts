declare global {
    interface Window {
        electronAPI: {
            printReceipt: (data: unknown) => Promise<void>;
            reloadApp: () => Promise<void>;
            platform: string;
        };
    }
}
export {};
//# sourceMappingURL=preload.d.ts.map