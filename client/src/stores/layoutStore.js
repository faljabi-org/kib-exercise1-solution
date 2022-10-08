import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

import { APP_BOTTOM_SHEET_HEIGHT } from 'constants/appConstants';

const useLayoutStore = create(
    devtools(immer((set) => ({
        smallScreen: false,
        toggleSmallScreen: smallScreen => set({ smallScreen }),
        screensContainerVisible: true,
        toggleScreensContainerVisibile: visible => set({ screensContainerVisible: visible }),
        screens: [],
        setScreens: screens => set({ screens }),
        selectedScreenIndex: 0,
        setSelectedScreenIndex: index => set({ selectedScreenIndex: index }),
        bottomSheetHeight: { heightId: uuidv4(), height: APP_BOTTOM_SHEET_HEIGHT.HALF },
        setBottomSheetHeight: height => set({ bottomSheetHeight: height }),
        callsScreenActiveViewIndex: 0,
        setCallsScreenActiveViewIndex: index => set({ callsScreenActiveViewIndex: index }),
        directionsScreenActiveViewIndex: 0,
        setDirectionsScreenActiveViewIndex: index => set({ directionsScreenActiveViewIndex: index }),
        reset: _ => {
            set({
                selectedScreenIndex: 0,
                callsScreenActiveViewIndex: 0,
                directionsScreenActiveViewIndex: 0
            });
        }
    })))
)

export default useLayoutStore;