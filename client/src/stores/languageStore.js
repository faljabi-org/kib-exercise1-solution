import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

import { LANGUAGE, LANGUAGE_STATE_KEY } from 'constants/languageConstants';

const useLanguageStore = create(
    subscribeWithSelector(
        immer(
            persist((set) => ({
                language: navigator.language?.includes('ar') ? 'ar' : 'en',
                switchLanguage: _ => set((state) => { state.language = state.language === LANGUAGE.AR ? LANGUAGE.EN : LANGUAGE.AR })
            }), { name: LANGUAGE_STATE_KEY })
        ))
)

export default useLanguageStore;