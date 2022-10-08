import { memo } from 'react';
import shallow from 'zustand/shallow';
import { v4 as uuidv4 } from 'uuid';
import { useDrag } from '@use-gesture/react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { safeAreaRightLeft } from 'constants/safeAreaConstants';
import { APP_BOTTOM_SHEET_HEIGHT as HEIGHTS } from 'constants/appConstants';

import AppBottomSheetHeaderHandle from 'components/app/AppBottomSheetHeaderHandle';

import useLayoutStore from 'stores/layoutStore';

const AppBottomSheetHeader = _ => {

    const [screens, selectedScreenIndex, bottomSheetHeight, setBottomSheetHeight] = useLayoutStore((state) => [

        state.screens,
        state.selectedScreenIndex,
        state.bottomSheetHeight,
        state.setBottomSheetHeight

    ], shallow);

    const bottomSheetHeaderLabel = screens.find(screen => screen.index === selectedScreenIndex)?.label ?? null;

    const onDrag = useDrag(({ last, direction: [, dy], velocity: [, vy] }) => {

        if (!last) return;

        switch (dy) {

            case 1: {

                if (bottomSheetHeight.height === HEIGHTS.FULL)
                    setBottomSheetHeight(vy > 3.7 ? { heightId: uuidv4(), height: HEIGHTS.TIP } : { heightId: uuidv4(), height: HEIGHTS.HALF });

                else if (bottomSheetHeight.height === HEIGHTS.HALF)
                    setBottomSheetHeight({ heightId: uuidv4(), height: HEIGHTS.TIP });

                break;
            }
            case -1: {

                if (bottomSheetHeight.height === HEIGHTS.TIP)
                    setBottomSheetHeight(vy > 3.7 ? { heightId: uuidv4(), height: HEIGHTS.FULL } : { heightId: uuidv4(), height: HEIGHTS.HALF });

                else if (bottomSheetHeight.height === HEIGHTS.HALF)
                    setBottomSheetHeight({ heightId: uuidv4(), height: HEIGHTS.FULL });

                break;
            }
            default: setBottomSheetHeight({ heightId: uuidv4(), height: HEIGHTS.HALF }); break;
        }

    }, { axis: 'y' });

    return (
        <Box sx={{
            ...safeAreaRightLeft,
            touchAction: 'none'
        }} {...onDrag()}>
            {bottomSheetHeaderLabel && <>
                <AppBottomSheetHeaderHandle />
                <Typography
                    sx={theme => ({
                        px: theme.spacing(2.5),
                        py: theme.spacing(1.5),
                        userSelect: 'none'
                    })}
                    fontWeight='bold'
                    variant='h6'>
                    {bottomSheetHeaderLabel}
                </Typography>
            </>}
        </Box>
    )
}

export default memo(AppBottomSheetHeader);
