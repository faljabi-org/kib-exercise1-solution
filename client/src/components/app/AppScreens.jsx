import { lazy, Suspense, useMemo, memo } from 'react';
import shallow from 'zustand/shallow';

import { APP_SCREEN_TAB_INDEX } from 'constants/appConstants';

import SuspenseFallback from 'components/common/SuspenseFallback';

import useLayoutStore from 'stores/layoutStore';

const UsersScreen = lazy(_ => import('components/users/UsersScreen'));
const EmptyAppScreens = lazy(_ => import('components/app/EmptyAppScreens'));

const AppScreens = _ => {

    const [selectedScreenIndex] = useLayoutStore(state => [state.selectedScreenIndex], shallow);

    const screens = useMemo(_ => {

        return [{
            index: APP_SCREEN_TAB_INDEX.USERS,
            component: <UsersScreen />
        }];

    }, []);

    return (
        <Suspense fallback={<SuspenseFallback />}>
            {screens.find(screen => screen.index === selectedScreenIndex)?.component || <EmptyAppScreens />}
        </Suspense>
    )
}

export default memo(AppScreens);
