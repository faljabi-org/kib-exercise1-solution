import { useEffect, memo, useCallback } from 'react';
import shallow from 'zustand/shallow';
import { v4 as uuidv4 } from 'uuid';
import { useOrientation } from 'react-use';
import { useSpring, animated, config } from 'react-spring';

import Portal from '@mui/material/Portal';
import Paper from '@mui/material/Paper';

import AppBottomSheetHeader from 'components/app/AppBottomSheetHeader';

import { APP_BOTTOM_SHEET_HEIGHT as HEIGHTS } from 'constants/appConstants';

import useAppStandardSheet from 'hooks/app/use-app-standard-sheet';

import useLayoutStore from 'stores/layoutStore';

const WobblyBottomSheet = animated(Paper);

const AppBottomSheet = ({ children }) => {

    const orientation = useOrientation();
    const { standardSheet } = useAppStandardSheet();

    const [screensContainerVisible, bottomSheetHeight, setBottomSheetHeight] = useLayoutStore((state) => [

        state.screensContainerVisible,
        state.bottomSheetHeight,
        state.setBottomSheetHeight

    ], shallow);

    const [styles, api] = useSpring(() => ({ to: { height: 0 }, config: config.gentle }));

    const dummyEl = useCallback(node => {

        // Using dummy div to calculate offsetHeight

        if (node && bottomSheetHeight)
            api.start({ height: node.offsetHeight, immediate: bottomSheetHeight.height === HEIGHTS.HIDDEN });

    }, [api, bottomSheetHeight]);

    useEffect(_ => {

        if (screensContainerVisible)
            setBottomSheetHeight(standardSheet?.open ? { heightId: uuidv4(), height: HEIGHTS.HIDDEN } : { heightId: uuidv4(), height: HEIGHTS.HALF });
        else
            setBottomSheetHeight({ heightId: uuidv4(), height: HEIGHTS.HIDDEN });

    }, [orientation, standardSheet, screensContainerVisible, setBottomSheetHeight]);

    return (
        <Portal>
            <WobblyBottomSheet
                sx={theme => ({
                    position: 'absolute',
                    bottom: 0,
                    display: 'grid',
                    gridTemplateRows: 'max-content 1fr',
                    width: 1,
                    borderTopLeftRadius: theme.spacing(1),
                    borderTopRightRadius: theme.spacing(1),
                    overflow: 'hidden',
                    zIndex: styles.height.goal === 0 ? 1 : 0
                })}
                style={styles}>
                <AppBottomSheetHeader />
                {children}
            </WobblyBottomSheet>
            <div
                ref={dummyEl}
                style={{
                    display: 'block',
                    position: 'fixed',
                    height: bottomSheetHeight.height
                }}>
            </div>
        </Portal>
    )
}

export default memo(AppBottomSheet);