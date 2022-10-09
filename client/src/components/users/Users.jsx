import { useState, useCallback, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchOff from '@mui/icons-material/SearchOff';
import GroupsIcon from '@mui/icons-material/Groups';

import UsersSearchInput from 'components/users/UsersSearchInput';
import Error from 'components/common/Error';
import EmptyList from 'components/common/EmptyList';
import UsersListSkeleton from 'components/users/UsersListSkeleton';
import UsersList from 'components/users/UsersList';

import { safeAreaRightLeft } from 'constants/safeAreaConstants';

import useLayoutStore from 'stores/layoutStore';
import useSnackbarStore from 'stores/snackbarStore';
import { useUsersContext } from 'contexts/UsersContext';

const Users = _ => {

    const { t } = useTranslation();

    const smallScreen = useLayoutStore(state => state.smallScreen);

    const [openSuccessSnackbar, openErrorSnackbar] = useSnackbarStore(state => [

        state.openSuccessSnackbar,
        state.openErrorSnackbar

    ], shallow);

    const [scrollWidth, setScrollWidth] = useState(0);

    const {

        users,
        usersLoading,
        usersError,
        usersSearchText,
        usersSearchTextDebounced,
        updateUsersSearchText,
        manageUserStarted,
        editUserLocationResult,
        editUserLocationError,
        deleteUserResult,
        deleteUserError,
        resetCRUDState,
        highlightUserOnMap,
        clearUserHighlightOnMap,
        selectUser,
        startAddUser,
        endAddUser

    } = useUsersContext();

    const stackEl = useCallback(node => {

        node && users.length >= 0 && setScrollWidth(node.offsetWidth - node.clientWidth);

    }, [users]);

    useEffect(_ => {

        if (editUserLocationResult) {

            requestAnimationFrame(_ => openSuccessSnackbar({
                message: t('users@userEdited')
            }));
        }

        else if (editUserLocationError) {

            requestAnimationFrame(_ => openErrorSnackbar({
                message: [t('users@userEditFailed'), editUserLocationError.message].join(': ')
            }));
        }

        else if (deleteUserResult) {

            requestAnimationFrame(_ => openSuccessSnackbar({
                message: t('users@userDeleted')
            }));
        }

        else if (deleteUserError) {

            requestAnimationFrame(_ => openErrorSnackbar({
                message: [t('users@userDeleteFailed'), deleteUserError.message].join(': ')
            }));
        }

        return _ => resetCRUDState();

    }, [
        editUserLocationResult,
        editUserLocationError,
        deleteUserResult,
        deleteUserError,
        resetCRUDState,
        openSuccessSnackbar,
        openErrorSnackbar,
        t
    ]);

    return (
        <Box sx={{
            ...(smallScreen && safeAreaRightLeft),
            display: 'grid',
            gridTemplateRows: 'max-content 1fr',
            height: 1
        }}>
            <Stack
                p={2}
                width={1}
                spacing={2}
                bgcolor={theme => theme.palette.grey[theme.palette.mode === 'light' ? 100 : 900]}>
                <UsersSearchInput
                    searchText={usersSearchText}
                    onSearchTextChange={updateUsersSearchText} />
            </Stack>
            <Box
                ref={stackEl}
                height={1}
                overflow='auto'>
                {usersLoading ? <UsersListSkeleton />
                    :
                    usersError ? <Error errorMessage={usersError.message} />
                        :
                        users.length === 0 && usersSearchTextDebounced.trim() ?
                            <EmptyList
                                title={t('common@noResultsFound')}
                                tagline={t('common@noResultsFoundTagline')}
                                Icon={SearchOff} />
                            :
                            users.length === 0 ?
                                <EmptyList
                                    title={t('users@emptyUsersList')}
                                    tagline={t('users@emptyUsersListTagline')}
                                    Icon={GroupsIcon} />
                                :
                                <UsersList
                                    ref={stackEl}
                                    items={users}
                                    onItemSelect={selectUser}
                                    onItemHover={highlightUserOnMap}
                                    onItemBlur={clearUserHighlightOnMap} />}
            </Box>
            <Zoom in timeout={300}>
                <Tooltip title={manageUserStarted ? t('common@cancel') : t('users@addUser')} placement='left' arrow>
                    <Fab
                        sx={theme => ({
                            position: 'absolute',
                            bottom: theme.spacing(2),
                            right: `calc(${theme.spacing(2)} + ${scrollWidth}px ${smallScreen ? '+ env(safe-area-inset-right)' : ''})`,
                            zIndex: 0
                        })}
                        color='secondary'
                        onClick={manageUserStarted ? endAddUser : startAddUser}>
                        {manageUserStarted ? <CancelIcon /> : <AddIcon />}
                    </Fab>
                </Tooltip>
            </Zoom>
        </Box>
    )
}

export default memo(Users);