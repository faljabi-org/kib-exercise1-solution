import { createContext, useContext } from 'react';

import useMap from 'hooks/map/use-map';

import useLanguageStore from 'stores/languageStore';
import useThemeStore from 'stores/themeStore';

const MapContext = createContext();

const MapContextProvider = ({ children }) => {
    
    const language = useLanguageStore(state => state.language);
    const theme = useThemeStore(state => state.theme);

    const { map, mapLoading, mapError, reloadMap } = useMap({
        baseLayers: window.env.map.baseLayers[language][theme]
    });

    return (
        <MapContext.Provider value={{
            map,
            mapLoading,
            mapError,
            reloadMap
        }}>
            {children}
        </MapContext.Provider>
    )
}

const useMapContext = _ => {

    let context = useContext(MapContext);

    if (!context)
        throw new Error('MapContext was used outside of its Provider');

    return context;
}

export { useMapContext, MapContextProvider };
