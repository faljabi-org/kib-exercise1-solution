import { useCallback } from 'react';

import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

import { DEFAULT_LAYER_EFFECT } from 'constants/mapConstants';

const useMapViewHelper = ({ mapView }) => {

    const highlightFeatureOnMap = useCallback(({ layerId, featureId }) => {

        let layer = mapView?.map.findLayerById(layerId);

        mapView?.whenLayerView(layer).then(layerView => {

            reactiveUtils
                .whenOnce(() => !layerView.updating)
                .then(_ => {

                    layerView.featureEffect = new FeatureEffect({
                        filter: new FeatureFilter({
                            where: `id='${featureId}'`
                        }),
                        includedEffect: 'drop-shadow(0px 0px 10px #ffffff)',
                        excludedEffect: 'blur(1px) opacity(0.5)'
                    });
                });

        }).catch(e => {

            console.info(e.message);
        });

    }, [mapView]);

    const clearFeatureHighlightOnMap = useCallback(({ layerId }) => {

        let layer = mapView?.map.findLayerById(layerId);

        mapView?.whenLayerView(layer).then(layerView => {

            reactiveUtils
                .whenOnce(() => !layerView.updating)
                .then(_ => {

                    layerView.featureEffect = DEFAULT_LAYER_EFFECT;
                });
                
        }).catch(e => {

            console.info(e.message);
        });

    }, [mapView]);

    const selectFeatureOnMap = useCallback(({ layerId, featureId }) => {

        let layer = mapView?.map.findLayerById(layerId);

        mapView?.whenLayerView(layer).then(layerView => {

            reactiveUtils
                .whenOnce(() => !layerView.updating)
                .then(_ => {

                    layerView.featureEffect = new FeatureEffect({
                        filter: new FeatureFilter({
                            where: `id='${featureId}'`
                        }),
                        includedEffect: 'drop-shadow(0px 0px 10px #ffffff)',
                        excludedEffect: 'blur(1px) opacity(0.7) grayscale(1)'
                    });
                });

        }).catch(e => {

            console.info(e.message);
        });

    }, [mapView]);

    const clearFeautureSelectionOnMap = useCallback(({ layerId }) => {

        let layer = mapView?.map.findLayerById(layerId);

        mapView?.whenLayerView(layer).then(layerView => {

            reactiveUtils
                .whenOnce(() => !layerView.updating)
                .then(_ => {

                    layerView.featureEffect = DEFAULT_LAYER_EFFECT;
                });

        }).catch(e => {

            console.info(e.message);
        });

    }, [mapView]);

    return {
        highlightFeatureOnMap,
        clearFeatureHighlightOnMap,
        selectFeatureOnMap,
        clearFeautureSelectionOnMap
    }
}

export default useMapViewHelper;