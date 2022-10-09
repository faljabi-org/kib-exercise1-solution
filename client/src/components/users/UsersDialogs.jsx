import { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import ManageUserDialog from 'components/users/ManageUserDialog';

import useSnackbarStore from 'stores/snackbarStore';
import { useMapViewContext } from 'contexts/MapViewContext';
import { useUsersContext } from 'contexts/UsersContext';

const UsersDialogs = _ => {

    const { t } = useTranslation();

    const [openInfoSnackbar, openSuccessSnackbar, openErrorSnackbar, closeSnackbar] = useSnackbarStore(state => [

        state.openInfoSnackbar,
        state.openSuccessSnackbar,
        state.openErrorSnackbar,
        state.closeSnackbar

    ], shallow);

    const { toggleMapViewToolsDisabled } = useMapViewContext();

    const {

        viewVisible,
        manageUserDialogVisible,
        manageUserDialogMode,
        manageUserStarted,
        addUserResult,
        addUserLoading,
        addUserError,
        editUserResult,
        editUserLoading,
        editUserError,
        resetCRUDState,
        manageUserValidationResults,
        selectedUser,
        endAddUser,
        endEditUser,
        addUser,
        editUser

    } = useUsersContext();

    useEffect(_ => {

        toggleMapViewToolsDisabled(manageUserStarted);

        if (manageUserStarted && !manageUserDialogVisible && manageUserDialogMode === 0) {

            openInfoSnackbar({
                message: t('users@addUserLocation'),
                autoHide: false
            });
        }

        return _ => manageUserStarted && closeSnackbar();

    }, [manageUserStarted, manageUserDialogVisible, manageUserDialogMode, toggleMapViewToolsDisabled, openInfoSnackbar, closeSnackbar, t]);

    useEffect(_ => {

        if (addUserResult) {

            requestAnimationFrame(_ => openSuccessSnackbar({
                message: t('users@userAdded')
            }));
        }

        else if (addUserError) {

            requestAnimationFrame(_ => openErrorSnackbar({
                message: [t('users@userAddFailed'), addUserError.message].join(': ')
            }));
        }

        else if (editUserResult) {

            requestAnimationFrame(_ => openSuccessSnackbar({
                message: t('users@userEdited')
            }));
        }

        else if (editUserError) {

            requestAnimationFrame(_ => openErrorSnackbar({
                message: [t('users@userEditFailed'), editUserError.message].join(': ')
            }));
        }

        return _ => resetCRUDState();

    }, [
        viewVisible,
        addUserResult,
        addUserError,
        editUserResult,
        editUserError,
        resetCRUDState,
        openInfoSnackbar,
        openSuccessSnackbar,
        openErrorSnackbar,
        closeSnackbar,
        t
    ]);

    return (
        manageUserDialogVisible && <ManageUserDialog
            mode={manageUserDialogMode}
            onAdd={addUser}
            onCancelAdd={endAddUser}
            addLoading={addUserLoading}
            selectedItem={selectedUser}
            onEdit={editUser}
            onCancelEdit={endEditUser}
            editLoading={editUserLoading}
            validationResults={manageUserValidationResults}
        />
    )
}

export default memo(UsersDialogs);