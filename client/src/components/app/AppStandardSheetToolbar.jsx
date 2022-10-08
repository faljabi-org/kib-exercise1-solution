import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

import { safeAreaRightLeft } from 'constants/safeAreaConstants';
import { LANGUAGE } from 'constants/languageConstants';

import useLanguageStore from 'stores/languageStore';
import useLayoutStore from 'stores/layoutStore';

const AppStandardSheetToolbar = ({ title, onClose }) => {

    const language = useLanguageStore(state => state.language);
    const smallScreen = useLayoutStore(state => state.smallScreen);

    return (
        <AppBar
            sx={{
                ...(smallScreen && safeAreaRightLeft),
                boxShadow: 'none'
            }}
            position='relative'
            color='default'>
            <Toolbar
                sx={{
                    gap: 1,
                    flexDirection: smallScreen ? 'row-reverse' : 'row'
                }}
                variant={smallScreen ? 'regular' : 'dense'}>
                {smallScreen ?
                    <IconButton size='small' onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    :
                    <IconButton
                        size='small'
                        onClick={onClose}>
                        {language === LANGUAGE.EN ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                    </IconButton>}
                <Typography sx={{ flex: 1 }} fontWeight={theme => theme.typography.fontWeightMedium}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default memo(AppStandardSheetToolbar);