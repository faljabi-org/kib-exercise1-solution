import { createContext, useContext } from 'react';
import shallow from 'zustand/shallow';

import { useMapViewContext } from 'contexts/MapViewContext';

import useLayoutStore from 'stores/layoutStore';
import useUsersViewModel from 'hooks/users/use-users-view-model';

import { APP_SCREEN_TAB_INDEX } from 'constants/appConstants';

const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {

    const { mapView } = useMapViewContext();

    const [screensContainerVisible, selectedScreenIndex] = useLayoutStore(state => [

        state.screensContainerVisible,
        state.selectedScreenIndex

    ], shallow);

    const usersViewModel = useUsersViewModel({
        mapView,
        viewVisible: screensContainerVisible && selectedScreenIndex === APP_SCREEN_TAB_INDEX.USERS
    });

    return (
        <UsersContext.Provider value={usersViewModel}>
            {children}
        </UsersContext.Provider>
    )
}

const useUsersContext = _ => {

    let context = useContext(UsersContext);

    if (!context)
        throw new Error('UsersContext was used outside of its Provider');

    return context;
}

export { useUsersContext, UsersContextProvider };
