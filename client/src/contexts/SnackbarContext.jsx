import { createContext, useState, useCallback, useContext } from 'react';

const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children }) => {

    const [snackbarState, setSnackbarState] = useState({ open: false, severity: null, message: null, autoHide: true });

    const openSnackbar =  useCallback(({ severity, message, autoHide = true }) => setSnackbarState({ open: true, severity, message, autoHide }), []);
    const closeSnackbar = useCallback(_ => setSnackbarState(snackbarState => ({ ...snackbarState, open: false })), []);

    return (
        <SnackbarContext.Provider value={{
            snackbarState,
            openSnackbar,
            closeSnackbar
        }}>
            {children}
        </SnackbarContext.Provider>
    )
}

const useSnackbarContext = _ => {

    let context = useContext(SnackbarContext);

    if (!context)
        throw new Error('SnackbarContext was used outside of its Provider');

    return context;
}

export { useSnackbarContext, SnackbarContextProvider };
