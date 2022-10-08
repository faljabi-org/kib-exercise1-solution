import { memo, useEffect, useState } from 'react';

import SelectedUserDetails from 'components/users/SelectedUserDetails';

import { useUsersContext } from 'contexts/UsersContext';

const SelectedUser = _ => {

    const [clonedSelectedItem, setClonedSelectedItem] = useState();

    const {
        usersLoading,
        selectedUser,
        startEditUser,
        startEditUserLocation,
        editUserLocationStarted,
        editUserLocationLoading,
        endEditUserLocation,
        deleteUser,
        deleteUserLoading,
        zoomToSelectedUserOnMap
    } = useUsersContext();

    useEffect(_ => {

        selectedUser && setClonedSelectedItem(selectedUser);

    }, [selectedUser]);

    return (
        clonedSelectedItem &&
        <SelectedUserDetails
            selectedItem={clonedSelectedItem}
            onZoom={zoomToSelectedUserOnMap}
            onStartEdit={startEditUser}
            onStartEditLocation={startEditUserLocation}
            editLocationStarted={editUserLocationStarted}
            editLocationLoading={editUserLocationLoading}
            onCancelEditLocation={endEditUserLocation}
            onDelete={deleteUser}
            deleteLoading={deleteUserLoading}
            usersLoading={usersLoading}
        />
    )
}

export default memo(SelectedUser);