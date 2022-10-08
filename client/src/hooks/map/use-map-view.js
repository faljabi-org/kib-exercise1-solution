import { useState, useCallback, useEffect } from 'react';

import { yellow } from '@mui/material/colors';

import MapView from '@arcgis/core/views/MapView';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

import { USERS_LAYER_ID } from 'constants/usersConstants';

const useMapView = ({ mapEl, map, mapViewProps }) => {

    const [mapView, setMapView] = useState(null);
    const [mapViewReady, setMapViewReady] = useState(false);
    const [mapViewError, setMapViewError] = useState(null);
    const [mapViewOrientation, setMapViewOrientation] = useState(null);
    const [mapViewToolsVisible, setMapViewToolsVisible] = useState(true);
    const [mapViewToolsDisabled, setMapViewToolsDisabled] = useState(false);
    const [mapViewContextMenuLocation, setMapViewContextMenuLocation] = useState(null);

    const onMapViewReadyChange = useCallback(ready => setMapViewReady(ready), []);
    const onMapViewOrientationChange = useCallback(orientation => setMapViewOrientation(orientation), []);

    const toggleMapViewToolsVisibility = useCallback(visible => {

        setMapViewToolsVisible(visible);

    }, []);

    const toggleMapViewToolsDisabled = useCallback(disabled => {

        setMapViewToolsDisabled(disabled);

    }, []);

    const clearMapViewContextMenuLocation = useCallback(_ => {

        setMapViewContextMenuLocation(null);

    }, []);

    useEffect(_ => {

        if (!map) return;

        let view = new MapView({
            map,
            container: mapEl.current,
            highlightOptions: {
                color: yellow[600],
                fillOpacity: 0.9
            },
            popup: {
                autoOpenEnabled: false,
                autoCloseEnabled: false
            },
            showAttribution: false,
            ui: { components: [] },
            ...mapViewProps
        });

        let watchMapViewReadyHandle = reactiveUtils.watch(_ => view.ready, onMapViewReadyChange, { initial: true });
        let watchMapViewOrientationHandle = reactiveUtils.watch(_ => view.orientation, onMapViewOrientationChange, { initial: true });

        view.when(view => setMapView(view), error => setMapViewError(new Error(error)));

        return _ => {

            watchMapViewReadyHandle.remove();
            watchMapViewOrientationHandle.remove();

            view.container = null;
        }

    }, [mapEl, map, mapViewProps, onMapViewReadyChange, onMapViewOrientationChange]);

    useEffect(_ => {

        if (!mapView?.ready) return;

        const layersID = [USERS_LAYER_ID];

        let mapViewPointerMoveHandle = mapView.on('pointer-move', e => {

            mapView.container.style.cursor !== 'crosshair' &&

                mapView.hitTest(e).then(response => {

                    let hitTestResults = response.results.filter(result => layersID.includes(result.graphic?.layer?.id));
                    mapView.container.style.cursor = hitTestResults.length > 0 ? 'pointer' : 'default';
                });
        });

        let mapViewRightClickHandle = mapView.on('click', e => {

            e.button === 2 && mapView.container.style.cursor !== 'crosshair' &&

                setMapViewContextMenuLocation({
                    mapPoint: e.mapPoint,
                    screenPoint: { x: e.x, y: e.y }
                });
        });

        let mapViewHoldClickHandle = mapView.on('hold', e => {

            mapView.container.style.cursor !== 'crosshair' &&

                setMapViewContextMenuLocation({
                    mapPoint: e.mapPoint,
                    screenPoint: { x: e.x, y: e.y }
                });
        });

        return _ => {

            mapViewPointerMoveHandle.remove();
            mapViewRightClickHandle.remove();
            mapViewHoldClickHandle.remove();
        }

    }, [mapView]);

    return {
        mapView,
        mapViewReady,
        mapViewError,
        mapViewOrientation,
        mapViewToolsVisible,
        mapViewToolsDisabled,
        mapViewContextMenuLocation,
        toggleMapViewToolsVisibility,
        toggleMapViewToolsDisabled,
        clearMapViewContextMenuLocation
    }
}

export default useMapView;