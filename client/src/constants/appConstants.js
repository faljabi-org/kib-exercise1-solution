const APP_SCREEN_TAB_INDEX = Object.freeze({
    USERS: 0
});

const APP_STANDARD_SHEET_TYPE = Object.freeze({
    USER: 0
});

const APP_BOTTOM_SHEET_HEIGHT = Object.freeze({
    HIDDEN: '0px',
    TIP: `calc(${56 * 2}px + env(safe-area-inset-bottom))`,
    HALF: '50%',
    FULL: 'calc(100% - 56px - 16px - env(safe-area-inset-top))'
});

export {
    APP_SCREEN_TAB_INDEX,
    APP_STANDARD_SHEET_TYPE,
    APP_BOTTOM_SHEET_HEIGHT
}