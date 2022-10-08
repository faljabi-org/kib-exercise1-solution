import { lazy, useEffect, Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';

import SuspenseFallback from 'components/common/SuspenseFallback';
import AppSnackbar from 'components/app/AppSnackbar';

import useOnlineStatus from 'hooks/app/use-online-status';

import useLayoutStore from 'stores/layoutStore';
import useSnackbarStore from 'stores/snackbarStore';

const App = lazy(_ => import('components/app/App'));
const NotFound = lazy(_ => import('components/app/NotFound'));

const AppContainer = _ => {

    const { t, ready: translationReady } = useTranslation();
    const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });

    const toggleSmallScreen = useLayoutStore((state) => state.toggleSmallScreen);
    const [openInfoSnackbar, openErrorSnackbar] = useSnackbarStore(state => [state.openInfoSnackbar, state.openErrorSnackbar], shallow);

    const { online, previousOnlineState } = useOnlineStatus();

    useEffect(_ => {

        toggleSmallScreen(smallScreen);

    }, [toggleSmallScreen, smallScreen]);

    useEffect(_ => {

        if (online && !previousOnlineState) openInfoSnackbar({
            message: t('app@internetConnectionRestored')
        });

        else if (!online && previousOnlineState) openErrorSnackbar({
            message: t('app@internetConnectionOffline')
        });

    }, [online, previousOnlineState, openInfoSnackbar, openErrorSnackbar, t]);

    return (
        translationReady && <Box sx={{ height: '100vh' }}>
            <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                    <Route
                        path='/'
                        element={<App />} />
                    <Route
                        path='*'
                        element={<NotFound />} />
                </Routes>
            </Suspense>
            <Portal>
                <AppSnackbar />
            </Portal>
        </Box>
    )
}

export default memo(AppContainer);