import { useEffect } from 'react';

export const useIdleTimer = (
    timeout: number,
    onIdle: () => void,
    active: boolean = true
) => {
    useEffect(() => {
        if (!active) return;

        let timeoutId: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(onIdle, timeout);
        };

        // Initial start
        resetTimer();

        // Events to listen for activity
        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click',
        ];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            clearTimeout(timeoutId);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [timeout, onIdle, active]);
};
