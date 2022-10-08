import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import SelectedUser from 'components/users/SelectedUser';

import { APP_STANDARD_SHEET_TYPE } from 'constants/appConstants';

import useLayoutStore from 'stores/layoutStore';
import { useUsersContext } from 'contexts/UsersContext';

const useAppStandardSheet = _ => {

    const { t } = useTranslation();

    const [standardSheet, setStandardSheet] = useState(null);

    const { selectedUserId, clearUserSelection } = useUsersContext();

    const toggleScreensContainerVisibile = useLayoutStore(state => state.toggleScreensContainerVisibile);

    const clearPreviousSelections = useCallback(_ => {

        setStandardSheet(standardSheet => ({
            ...standardSheet,
            open: false
        }));

        [
            selectedUserId
        ]
            .filter(item => item)
            .sort((a, b) => b.selectionTime - a.selectionTime)
            .forEach((item, index) => {

                if (index === 0) return;

                item.type === APP_STANDARD_SHEET_TYPE.USER && selectedUserId && clearUserSelection();
            });
    }, [
        selectedUserId,
        clearUserSelection
    ]);

    useEffect(_ => {

        clearPreviousSelections();

        if (selectedUserId) {

            setStandardSheet({
                title: t('users@userDetails'),
                open: true,
                type: APP_STANDARD_SHEET_TYPE.USER,
                sheet: <SelectedUser />,
                onClose: clearUserSelection
            });
        }
        else setStandardSheet(standardSheet => ({
            ...standardSheet,
            open: false
        }));

    }, [
        selectedUserId,
        clearUserSelection,
        clearPreviousSelections,
        toggleScreensContainerVisibile,
        t
    ]);

    return { standardSheet };
}

export default useAppStandardSheet;