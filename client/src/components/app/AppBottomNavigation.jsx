import { memo } from 'react';
import shallow from 'zustand/shallow';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { safeAreaRightBottomLeft } from 'constants/safeAreaConstants';

import useLayoutStore from 'stores/layoutStore';

const AppBottomNavigation = _ => {

    const [smallScreen, screens, selectedScreenIndex, setSelectedScreenIndex] = useLayoutStore((state) => [

        state.smallScreen,
        state.screens,
        state.selectedScreenIndex,
        state.setSelectedScreenIndex

    ], shallow);

    return (
        screens.length > 0 && <BottomNavigation
            sx={theme => ({
                ...(smallScreen && safeAreaRightBottomLeft),
                boxSizing: 'content-box',
                boxShadow: theme.shadows[3]
            })}
            showLabels
            value={selectedScreenIndex}
            onChange={(_, i) => setSelectedScreenIndex(i)}>
            {screens.map(screen => (
                <BottomNavigationAction
                    key={screen.label}
                    value={screen.index}
                    label={screen.label}
                    icon={screen.icon}
                />
            ))}
        </BottomNavigation>
    )
}

export default memo(AppBottomNavigation);