import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

import { THEME_TYPE, THEME_STATE_KEY } from 'constants/themeConstants';

const useThemeStore = create(
    immer(
        persist((set) => ({
            theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            switchTheme: currentTheme => set((state) => { state.theme = currentTheme === THEME_TYPE.LIGHT ? THEME_TYPE.DARK : THEME_TYPE.LIGHT }),
        }), { name: THEME_STATE_KEY })
    )
)

export default useThemeStore;