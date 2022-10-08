import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { SEVERITY_TYPE } from 'constants/snackbarConstants';

const useSnackbarStore = create(
    devtools(immer((set, get) => ({
        snackbar: { open: false, severity: null, message: null, autoHide: true },
        closeSnackbar: _ => set({ snackbar: { ...get().snackbar, open: false } }),
        openSuccessSnackbar: ({ message, autoHide = true }) => set({ snackbar: { open: true, severity: SEVERITY_TYPE.SUCCESS, message, autoHide } }),
        openInfoSnackbar: ({ message, autoHide = true }) => set({ snackbar: { open: true, severity: SEVERITY_TYPE.INFO, message, autoHide } }),
        openWarningSnackbar: ({ message, autoHide = true }) => set({ snackbar: { open: true, severity: SEVERITY_TYPE.WARNING, message, autoHide } }),
        openErrorSnackbar: ({ message, autoHide = true }) => set({ snackbar: { open: true, severity: SEVERITY_TYPE.ERROR, message, autoHide } })
    })))
)

export default useSnackbarStore;