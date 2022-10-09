import { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import AppHeader from 'components/app/AppHeader';
import AppBottomNavigation from 'components/app/AppBottomNavigation';
import AppBottomSheet from 'components/app/AppBottomSheet';
import AppFloatingPanel from 'components/app/AppFloatingPanel';
import AppStandardSlideSheet from 'components/app/AppStandardSlideSheet';
import AppStandardBottomSheet from 'components/app/AppStandardBottomSheet';
import AppScreens from 'components/app/AppScreens';
import AppDialogs from 'components/app/AppDialogs';

import MainMap from 'components/map/MainMap';
import MapContextMenu from 'components/map/MapContextMenu';

import GroupsIcon from '@mui/icons-material/Groups';

import { APP_SCREEN_TAB_INDEX } from 'constants/appConstants';

import useLayoutStore from 'stores/layoutStore';

// For production apps, I use Zustand as a state manager and not contexts.
// But for small apps and the sake of the exercise, React contexts are fine.

import { MapContextProvider } from 'contexts/MapContext';
import { MapViewContextProvider } from 'contexts/MapViewContext';
import { UsersContextProvider } from 'contexts/UsersContext';

const App = _ => {

    const { t } = useTranslation();

    const [smallScreen, setScreens, setSelectedScreenIndex] = useLayoutStore(state => [

        state.smallScreen,
        state.setScreens,
        state.setSelectedScreenIndex

    ], shallow);

    useEffect(_ => {

        const screens = [{
            index: APP_SCREEN_TAB_INDEX.USERS,
            label: t('users@users'),
            icon: <GroupsIcon />
        }];

        setScreens(screens);
        setSelectedScreenIndex(0);

    }, [setScreens, setSelectedScreenIndex, t]);

    return (
        <MapContextProvider>
            <MapViewContextProvider>
                <MainMap />
                <UsersContextProvider>
                    <AppHeader />
                    <MapContextMenu />
                    {smallScreen ?
                        <AppBottomSheet>
                            <AppScreens />
                            <AppBottomNavigation />
                            <AppStandardBottomSheet />
                        </AppBottomSheet>
                        :
                        <AppFloatingPanel>
                            <AppScreens />
                            <AppBottomNavigation />
                            <AppStandardSlideSheet />
                        </AppFloatingPanel>}
                    <AppDialogs />
                </UsersContextProvider>
            </MapViewContextProvider>
        </MapContextProvider>
    )
}

export default memo(App);