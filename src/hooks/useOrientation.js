import { useState, useEffect } from 'react';

export function useOrientation() {
    const [isPortrait, setIsPortrait] = useState(true);

    useEffect(() => {
        // Initial check
        const mql = window.matchMedia("(orientation: portrait)");
        setIsPortrait(mql.matches);

        const onChange = (e) => {
            setIsPortrait(e.matches);
        };

        if (mql.addEventListener) {
            mql.addEventListener('change', onChange);
            return () => mql.removeEventListener('change', onChange);
        } else {
            // Fallback for older browsers
            mql.addListener(onChange);
            return () => mql.removeListener(onChange);
        }
    }, []);

    return isPortrait;
}
