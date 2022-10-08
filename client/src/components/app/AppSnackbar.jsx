import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

import useLayoutStore from 'stores/layoutStore';

import useSnackbarStore from 'stores/snackbarStore';

const AppSnackbar = _ => {

    const { t } = useTranslation();
    const smallScreen = useLayoutStore(state => state.smallScreen);
    const [{ open, message, severity, autoHide }, closeSnackbar] = useSnackbarStore(state => [state.snackbar, state.closeSnackbar], shallow);

    const onSnackbarClose = (_, reason) => {

        if (reason === 'clickaway') return;
        closeSnackbar();
    }

    return (
        <Snackbar
            key={message}
            sx={theme => ({
                mr: 'env(safe-area-inset-right)',
                mb: `calc(${theme.spacing(smallScreen ? 7 : 0)} + env(safe-area-inset-bottom))`,
                ml: 'env(safe-area-inset-left)'
            })}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={open}
            TransitionComponent={Slide}
            autoHideDuration={autoHide ? 3000 : null}
            onClose={onSnackbarClose}>
            <Alert
                sx={{ width: 1 }}
                elevation={6}
                severity={severity}
                closeText={t('common@close')}
                onClose={onSnackbarClose}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default memo(AppSnackbar);
