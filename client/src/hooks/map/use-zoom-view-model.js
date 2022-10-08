import { useState, useCallback, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

const useZoomViewModel = mapView => {

    const [zoomViewModel, setZoomViewModel] = useState(null);
    const [canZoomIn, setCanZoomIn] = useState(false);
    const [canZoomOut, setCanZoomOut] = useState(false);

    const zoomIn = useCallback(_ => zoomViewModel.canZoomIn && zoomViewModel.zoomIn(), [zoomViewModel]);
    const zoomOut = useCallback(_ => zoomViewModel.canZoomOut && zoomViewModel.zoomOut(), [zoomViewModel]);

    const onMapViewZoomChange = useDebouncedCallback(_ => {

        setCanZoomIn(zoomViewModel?.canZoomIn);
        setCanZoomOut(zoomViewModel?.canZoomOut);

    }, 300);

    useEffect(_ => {

        if (!mapView?.ready) return;

        let zoomViewModel = new ZoomViewModel({ view: mapView });

        setZoomViewModel(zoomViewModel);

        let watchMapViewZoomChangeHandle = reactiveUtils.watch(_ => mapView.zoom, onMapViewZoomChange, { initial: true });

        return _ => watchMapViewZoomChangeHandle.remove();

    }, [mapView, onMapViewZoomChange]);

    return {
        canZoomIn,
        canZoomOut,
        zoomIn,
        zoomOut
    }
}

export default useZoomViewModel;