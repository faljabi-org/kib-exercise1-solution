import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Map from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import { MAP_TYPES } from 'constants/mapConstants';

const useMap = ({ baseLayers = [] }) => {

    const { t } = useTranslation();

    const [map, setMap] = useState(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [basemapError, setBasemapError] = useState(null);

    const createLayer = useCallback(({ id, type, title, url }) => {

        switch (type.toUpperCase()) {

            case MAP_TYPES.TILE: return new TileLayer({ id, title, url });
            case MAP_TYPES.VECTOR_TILE: return new VectorTileLayer({ id, title, url });
            case MAP_TYPES.MAP_IMAGE: return new MapImageLayer({ id, title, url });
            default: break;
        }

    }, []);

    const reloadMap = useCallback(_ => {

        if (!map) return;

        setMapLoading(true);

        let layerLoadedPromises = [];

        let baseLayers = map.basemap.baseLayers.map(baseLayer => {

            let layer = createLayer({ id: baseLayer.id, type: baseLayer.type, title: baseLayer.title, url: baseLayer.url });
            let loadedPromise = layer.when(null, _ => setBasemapError(new Error([t('common@loadingFailed'), baseLayer.title].join(' '))));

            layerLoadedPromises.push(loadedPromise);

            return layer;
        });

        let graphicsLayers = map.layers.filter(layer => layer.type === 'graphics');
        let routeLayers = map.layers.filter(layer => layer.type === 'route');
        let featureLayers = map.layers.filter(layer => layer.source);

        map.layers.removeAll();

        map.basemap = new Basemap({ baseLayers });
        map.layers.addMany([...graphicsLayers, ...routeLayers, ...featureLayers]);

        Promise
            .allSettled(layerLoadedPromises)
            .then(promises => {

                let allLayersLoaded = promises.map(promise => promise.value?.loaded).every(loaded => loaded);

                if (allLayersLoaded)
                    setBasemapError(null)
            })
            .finally(_ => setMapLoading(false));

    }, [map, createLayer, t]);

    const changeBasemap = useCallback(layers => {

        if (!map) return;

        setMapLoading(true);

        let layerLoadedPromises = [];

        let baseLayers = layers.map(baseLayer => {

            let layer = createLayer({ id: baseLayer.id, type: baseLayer.type, title: baseLayer.title, url: baseLayer.url });
            let loadedPromise = layer.when(null, _ => setBasemapError(new Error([t('common@loadingFailed'), baseLayer.title].join(' '))));

            layerLoadedPromises.push(loadedPromise);

            return layer;
        });

        map.basemap = new Basemap({ baseLayers });

        Promise
            .allSettled(layerLoadedPromises)
            .then(promises => {

                let allLayersLoaded = promises.map(promise => promise.value?.loaded).every(loaded => loaded);
                allLayersLoaded && setBasemapError(null);
            })
            .finally(_ => setMapLoading(false));

    }, [map, createLayer, t]);

    useEffect(_ => {
        
        if (map) return;
        
        let layerLoadedPromises = [];

        let esriMap = new Map({
            basemap: new Basemap({
                baseLayers: baseLayers.map(baseLayer => {

                    let layer = createLayer({ id: baseLayer.id, type: baseLayer.type, title: baseLayer.title, url: baseLayer.url });
                    let loadedPromise = layer.when(null, _ => setBasemapError(new Error([t('common@loadingFailed'), baseLayer.title].join(' '))));

                    layerLoadedPromises.push(loadedPromise);

                    return layer;
                })
            })
        });

        setMap(esriMap);

        Promise
            .allSettled(layerLoadedPromises)
            .then(promises => {

                let allLayersLoaded = promises.map(promise => promise.value?.loaded).every(loaded => loaded);

                if (allLayersLoaded)
                    setBasemapError(null);
            })
            .finally(_ => setMapLoading(false));

    }, [map, baseLayers, createLayer, t]);

    useEffect(_ => {

        map?.basemap?.loaded && changeBasemap(baseLayers);

    }, [map, baseLayers, changeBasemap]);

    return {
        map,
        mapLoading,
        mapError: basemapError,
        reloadMap,
        changeBasemap
    }
}

export default useMap;