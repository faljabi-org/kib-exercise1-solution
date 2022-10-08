import { memo } from 'react';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import { APP_BOTTOM_SHEET_HEIGHT as HEIGHTS } from 'constants/appConstants';

import AppStandardSheetToolbar from 'components/app/AppStandardSheetToolbar';

import useAppStandardSheet from 'hooks/app/use-app-standard-sheet';

const AppStandardBottomSheet = _ => {

    const { standardSheet } = useAppStandardSheet();

    return (
        <Slide
            key={standardSheet?.type}
            in={standardSheet?.open}
            direction='up'
            timeout={300}
            unmountOnExit>
            <Paper
                sx={theme => ({
                    position: 'fixed',
                    display: 'grid',
                    gridTemplateRows: 'max-content 1fr',
                    bottom: 0,
                    height: HEIGHTS.HALF,
                    width: 1,
                    transition: 'height 0.25s ease-out',
                    bborderTopLeftRadius: theme.spacing(1),
                    borderTopRightRadius: theme.spacing(1),
                    overflow: 'hidden',
                    zIndex: 1
                })}
                elevation={10}>
                <AppStandardSheetToolbar
                    title={standardSheet?.title}
                    onClose={standardSheet?.onClose} />
                {standardSheet?.sheet}
            </Paper>
        </Slide>
    )
}

export default memo(AppStandardBottomSheet);