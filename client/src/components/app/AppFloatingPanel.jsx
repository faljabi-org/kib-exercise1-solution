import { memo } from 'react';

import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';

import { LANGUAGE } from 'constants/languageConstants';

import useLanguageStore from 'stores/languageStore';
import useLayoutStore from 'stores/layoutStore';

const AppFloatingPanel = ({ children }) => {

    const language = useLanguageStore(state => state.language);
    const screensContainerVisible = useLayoutStore(state => state.screensContainerVisible);

    return (
        <Slide in={screensContainerVisible} direction={language === LANGUAGE.EN ? 'right' : 'left'} timeout={300}>
            <Paper
                sx={theme => ({
                    position: 'fixed',
                    top: `calc(64px + ${theme.spacing(2)} + env(safe-area-inset-top))`,
                    left: `calc(${theme.spacing(2)} + env(safe-area-inset-left))`,
                    display: 'grid',
                    gridTemplateRows: '1fr max-content',
                    width: 430,
                    height: `calc(100% - (${theme.spacing(12)} + env(safe-area-inset-top) + env(safe-area-inset-bottom)))`,
                    borderRadius: theme.spacing(1.5),
                    overflow: 'hidden',
                    zIndex: +screensContainerVisible
                })}
                elevation={3}>
                {children}
            </Paper>
        </Slide>
    )
}

export default memo(AppFloatingPanel);