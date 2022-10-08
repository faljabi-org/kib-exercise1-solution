import { blueGrey, red, blue, grey, common } from '@mui/material/colors';

const THEME_STATE_KEY = 'KIB_EXERCISE_CLIENT_THEME';

const THEME_TYPE = Object.freeze({
    LIGHT: 'light',
    DARK: 'dark'
});

const THEMES = Object.freeze({
    light: {
        palette: {
            mode: THEME_TYPE.LIGHT,
            primary: {
                main: blueGrey[900]
            },
            secondary: {
                main: red[600]
            },
            tertiary: {
                main: blueGrey[900]
            },
            background: {
                default: grey[50],
                paper: common.white
            }
        },
        typography: {
            fontFamily: [
                'Poppins',
                '-apple-system',
                'BlinkMacSystemFont',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                '"Fira Sans"',
                '"Droid Sans"',
                '"Helvetica Neue"',
                'sans-serif'
            ].join()
        }
    },
    dark: {
        palette: {
            mode: THEME_TYPE.DARK,
            primary: {
                main: blue[500]
            },
            secondary: {
                main: blue[800]
            },
            tertiary: {
                main: blue[500]
            }
        },
        typography: {
            fontFamily: [
                'Poppins',
                '-apple-system',
                'BlinkMacSystemFont',
                'Oxygen',
                'Ubuntu',
                'Cantarell',
                '"Fira Sans"',
                '"Droid Sans"',
                '"Helvetica Neue"',
                'sans-serif'
            ].join()
        }
    }
});

export { THEME_STATE_KEY, THEME_TYPE, THEMES };