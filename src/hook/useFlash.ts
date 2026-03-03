import * as React from 'react';
import { FlashLevel, FlashState } from '../component/flashMessage';

const DISMISS_DELAY_MS = 300; // fade-out animation duration

interface UseFlashReturn {
    flash: FlashState;
    showFlash: (message: string, level?: FlashLevel, duration?: number) => void;
}

export const useFlash = (): UseFlashReturn => {
    const [flash, setFlash] = React.useState<FlashState>({
        message: '',
        level: 'INFO',
        visible: false,
    });

    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const dismissRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const showFlash = React.useCallback(
        (message: string, level: FlashLevel = 'INFO', duration = 2000) => {
            // Clear any pending timers
            if (timerRef.current) clearTimeout(timerRef.current);
            if (dismissRef.current) clearTimeout(dismissRef.current);

            setFlash({ message, level, visible: true });

            // After <duration> ms, hide (trigger fade-out)
            timerRef.current = setTimeout(() => {
                setFlash((prev) => ({ ...prev, visible: false }));
                // Remove from DOM after animation
                dismissRef.current = setTimeout(() => {
                    setFlash({ message: '', level: 'INFO', visible: false });
                }, DISMISS_DELAY_MS);
            }, duration);
        },
        []
    );

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (dismissRef.current) clearTimeout(dismissRef.current);
        };
    }, []);

    return { flash, showFlash };
};
