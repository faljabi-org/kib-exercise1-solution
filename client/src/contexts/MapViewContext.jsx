import { createContext, useContext, useRef } from 'react';

import useMapView from 'hooks/map/use-map-view';
import useLanguageStore from 'stores/languageStore';
import useLayoutStore from 'stores/layoutStore';

import { useMapContext } from 'contexts/MapContext';

const MapViewContext = createContext();

const MapViewContextProvider = ({ children }) => {

    const language = useLanguageStore(state => state.language)
    const smallScreen = useLayoutStore(state => state.smallScreen);

    const mapEl = useRef();

    const { map } = useMapContext();

    const {
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
    } = useMapView({ mapEl, map, mapViewProps: window.env.mapView.properties, language, smallScreen });

    return (
        <MapViewContext.Provider value={{
            mapEl,
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
        }}>
            {children}
        </MapViewContext.Provider>
    )
}

const useMapViewContext = _ => {

    let context = useContext(MapViewContext);

    if (!context)
        throw new Error('MapViewContext was used outside of its Provider');

    return context;
}

export { useMapViewContext, MapViewContextProvider };
