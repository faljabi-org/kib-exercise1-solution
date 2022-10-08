import rtlPlugin from 'stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { THEMES } from 'constants/themeConstants';
import { LANGUAGE } from 'constants/languageConstants';

import useThemeStore from 'stores/themeStore';
import useLanguageStore from 'stores/languageStore';

const cacheRtl = createCache({ key: 'rtl', stylisPlugins: [rtlPlugin] });

const AppThemeProvider = ({ children }) => {

    const language = useLanguageStore(state => state.language);
    const [theme] = useThemeStore(state => [state.theme, state.createAppTheme, state.switchTheme]);

    const createAppTheme = (theme, language) => createTheme({
        ...theme,
        palette: {
            ...theme.palette
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: false
                }
            },
            MuiBottomNavigationAction: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            color: theme.palette.tertiary.main
                        }
                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        '&:-webkit-autofill': {
                            transitionDelay: '999999s',
                            transitionProperty: 'background-color, color',
                        }
                    }
                },
                defaultProps: {
                    autoComplete: 'off'
                }
            }
        },
        direction: language === LANGUAGE.AR ? 'rtl' : 'ltr'
    });

    return (
        <ThemeProvider theme={createAppTheme(THEMES[theme], language)}>
            <CssBaseline enableColorScheme />
            {language === LANGUAGE.AR ?
                <CacheProvider value={cacheRtl}>
                    {children}
                </CacheProvider>
                :
                children}
        </ThemeProvider>
    )
}

export default AppThemeProvider;