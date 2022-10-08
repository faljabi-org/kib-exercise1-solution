import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

const MAP_TYPES = Object.freeze({
    TILE: 'TILE',
    VECTOR_TILE: 'VECTOR-TILE',
    MAP_IMAGE: "MAP-IMAGE"
});

const DEFAULT_LAYER_EFFECT = new FeatureEffect({
    includedEffect: 'drop-shadow(0px 0px 3px #ffffff)',
    excludedEffect: 'drop-shadow(0px 0px 3px #ffffff)'
});

export {
    MAP_TYPES,
    DEFAULT_LAYER_EFFECT
}