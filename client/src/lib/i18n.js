import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Fetch from 'i18next-fetch-backend';

i18n
    .use(initReactI18next)
    .use(Fetch)
    .init({
        ns: ['users', 'app', 'map', 'common'],
        backend: {
            loadPath: `${window.env.host.virtualPath}/locales/{{lng}}/{{ns}}.json?v=`.replace(/\/\//g, '/') + new Date().getTime()
        },
        nsSeparator: '@',
        fallbackLng: 'en',
        lng: 'en',
        react: {
            useSuspense: false
        }
    });

export default i18n;