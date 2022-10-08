import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { THEME_TYPE } from 'constants/themeConstants';
import { safeAreaTopRightLeft } from 'constants/safeAreaConstants';

import useThemeStore from 'stores/themeStore';

const AppHeader = _ => {

    const { t } = useTranslation();

    const [theme, switchTheme] = useThemeStore(state => [state.theme, state.switchTheme]);

    return (
        <AppBar sx={{
            ...safeAreaTopRightLeft,
            boxShadow: 'none'
        }}>
            <Toolbar>
                <Slide in direction='down' timeout={700}>
                    <img
                        style={{ height: 32, width: 110, cursor: 'pointer' }}
                        src={`${process.env.PUBLIC_URL}/images/kib.svg`}
                        alt='KIB'
                        onClick={_ => window.location.reload()}
                    />
                </Slide>
                <Typography
                    sx={{ userSelect: 'none' }}
                    variant='caption'
                    ml={3}
                    flex={1}>
                    {t('app@appName')}
                </Typography>
                <IconButton
                    color='inherit'
                    onClick={_ => switchTheme(theme)}>
                    {theme === THEME_TYPE.LIGHT ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default memo(AppHeader);