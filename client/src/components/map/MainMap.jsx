import { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import Box from '@mui/material/Box';

import MapLoadingIndicator from 'components/map/MapLoadingIndicator';
import MapControls from 'components/map/MapControls';

import useZoomViewModel from 'hooks/map/use-zoom-view-model';

import { LANGUAGE } from 'constants/languageConstants';

import useLanguageStore from 'stores/languageStore';
import useLayoutStore from 'stores/layoutStore';

import useSnackbarStore from 'stores/snackbarStore';
import { useMapContext } from 'contexts/MapContext';
import { useMapViewContext } from 'contexts/MapViewContext';

const MainMap = _ => {

    const { t } = useTranslation();
    const language = useLanguageStore(state => state.language)
    const smallScreen = useLayoutStore(state => state.smallScreen);
    
    const [
        openErrorSnackbar,
        closeSnackbar
    ] = useSnackbarStore(state => [
        state.openErrorSnackbar,
        state.closeSnackbar
    ], shallow);

    const { mapLoading, mapError, reloadMap } = useMapContext();

    const {
        mapEl,
        mapView,
        mapViewReady,
        mapViewError,
        mapViewOrientation,
        mapViewToolsVisible
    } = useMapViewContext();

    const {
        canZoomIn,
        canZoomOut,
        zoomIn,
        zoomOut
    } = useZoomViewModel(mapView);

    useEffect(_ => {

        mapError ?

            openErrorSnackbar({
                message: mapError.message
            })
            :
            closeSnackbar();

    }, [mapError, openErrorSnackbar, closeSnackbar, t]);

    useEffect(_ => {

        mapViewError ?

            openErrorSnackbar({
                message: mapViewError.message
            })
            :
            closeSnackbar();

    }, [mapViewError, openErrorSnackbar, closeSnackbar, t]);

    useEffect(_ => {

        if (!mapView?.ready) return;

        if (smallScreen)
            mapView.padding = { bottom: mapView.height / 3 };
        else
            mapView.padding = language === 'ar' ? { right: 450 + 16 } : { left: 450 + 16 };

    }, [mapView, mapViewOrientation, smallScreen, language]);

    return (
        <>
            <Box ref={mapEl} sx={{ height: '100vh' }} />
            {mapLoading ?
                <MapLoadingIndicator />
                :
                mapViewReady && <MapControls
                    visible={mapViewToolsVisible}
                    slideAnimationDirection={language === LANGUAGE.EN ? 'left' : 'right'}
                    zoomInDisabled={!canZoomIn}
                    zoomOutDisabled={!canZoomOut}
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                    reloadMapVisible={!!mapError}
                    onReloadMap={reloadMap}
                />}
        </>
    )
}

export default memo(MainMap);
