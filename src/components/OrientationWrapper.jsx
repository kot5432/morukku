import React from 'react';
import { useOrientation } from '../hooks/useOrientation';

export function OrientationWrapper({ portraitComponent, landscapeComponent }) {
    const isPortrait = useOrientation();

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {isPortrait ? portraitComponent : landscapeComponent}
        </div>
    );
}
