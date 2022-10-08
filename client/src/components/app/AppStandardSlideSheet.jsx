import { memo } from 'react';

import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import { LANGUAGE } from 'constants/languageConstants';

import AppStandardSheetToolbar from 'components/app/AppStandardSheetToolbar';

import useAppStandardSheet from 'hooks/app/use-app-standard-sheet';

import useLanguageStore from 'stores/languageStore';

const AppStandardSlideSheet = _ => {

    const language = useLanguageStore(state => state.language);

    const { standardSheet } = useAppStandardSheet();

    return (
        <Slide
            key={standardSheet?.type}
            in={standardSheet?.open}
            direction={language === LANGUAGE.EN ? 'right' : 'left'}
            timeout={300}
            unmountOnExit>
            <Paper
                sx={{
                    position: 'absolute',
                    display: 'grid',
                    gridTemplateRows: 'max-content 1fr',
                    top: 0,
                    height: 1,
                    width: 1,
                    overflow: 'hidden'
                }}>
                <AppStandardSheetToolbar
                    title={standardSheet?.title}
                    onClose={standardSheet?.onClose} />
                {standardSheet?.sheet}
            </Paper>
        </Slide>
    )
}

export default memo(AppStandardSlideSheet);