import { useState, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import shallow from 'zustand/shallow';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import SelectedItemCardHeader from 'components/common/SelectedItemCardHeader';
import SelectedUserActions from 'components/users/SelectedUserActions';

import { safeAreaRightBottomLeft } from 'constants/safeAreaConstants';

import useLayoutStore from 'stores/layoutStore';
import useSnackbarStore from 'stores/snackbarStore';
import { useMapViewContext } from 'contexts/MapViewContext';

const SelectedUserDetails = ({
    selectedItem,
    onZoom,
    onStartEdit,
    onStartEditLocation,
    editLocationStarted,
    editLocationLoading,
    onCancelEditLocation,
    onDelete,
    deleteLoading,
    usersLoading
}) => {

    const { t } = useTranslation();
    const smallScreen = useLayoutStore(state => state.smallScreen);

    const [openInfoSnackbar, closeSnackbar] = useSnackbarStore(state => [

        state.openInfoSnackbar,
        state.closeSnackbar

    ], shallow);

    const { toggleMapViewToolsDisabled } = useMapViewContext();

    const [detailsTabIndex, setDetailsTabIndex] = useState(0);

    const changeDetailsTabIndex = useCallback((e, index) => setDetailsTabIndex(index), []);

    useEffect(_ => {

        toggleMapViewToolsDisabled(editLocationStarted);

        if (editLocationStarted) {

            openInfoSnackbar({
                message: t('users@editUserLocation'),
                autoHide: false
            });
        }

        return _ => editLocationStarted && closeSnackbar();

    }, [editLocationStarted, toggleMapViewToolsDisabled, openInfoSnackbar, closeSnackbar, t]);

    return (
        <Card
            sx={{
                ...(smallScreen && safeAreaRightBottomLeft),
                overflowY: 'auto'
            }}
            elevation={0}>
            <SelectedItemCardHeader
                title={selectedItem.name}
                subtitle={`@${selectedItem.username}`}
                iconColor='#0288d1'
                Icon={AccountCircle}
                onActionClick={onZoom}
            />
            <CardContent>
                <Box pb={3}>
                    <SelectedUserActions
                        selectedItem={selectedItem}
                        onStartEdit={onStartEdit}
                        onStartEditLocation={onStartEditLocation}
                        editLocationStarted={editLocationStarted}
                        editLocationLoading={editLocationLoading}
                        onCancelEditLocation={onCancelEditLocation}
                        onDelete={onDelete}
                        deleteLoading={deleteLoading}
                        usersLoading={usersLoading}
                    />
                </Box>
                <Tabs value={detailsTabIndex} indicatorColor='secondary' onChange={changeDetailsTabIndex}>
                    <Tab label={t('users@basicInfo')} />
                    <Tab label={t('users@contactInfo')} />
                    <Tab label={t('users@addressInfo')} />
                </Tabs>
                {detailsTabIndex === 0 && <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.website ? <Link
                                underline='none'
                                target='_blank'
                                href={`${selectedItem.website}`}>
                                {selectedItem.website}
                            </Link> : t('common@NA')}
                            secondary={t('users@website')} />
                    </ListItem>
                </List>}
                {detailsTabIndex === 1 && <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.email ? <Link
                                underline='none'
                                href={`mailto:${selectedItem.email}`}>
                                {selectedItem.email}
                            </Link> : t('common@NA')}
                            secondary={t('users@email')} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.phone ? <Link
                                underline='none'
                                href={`tel:${selectedItem.phone}`}>
                                {selectedItem.phone}
                            </Link> : t('common@NA')}
                            secondary={t('users@phone')} />
                    </ListItem>
                </List>}
                {detailsTabIndex === 2 && <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.address.city || t('common@NA')}
                            secondary={t('users@city')} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SignpostIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.address.street || t('common@NA')}
                            secondary={t('users@street')} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <OtherHousesIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.address.suite || t('common@NA')}
                            secondary={t('users@suite')} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PersonPinIcon />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ wordBreak: 'break-word' }}
                            primary={selectedItem.address.zipcode || t('common@NA')}
                            secondary={t('users@zipcode')} />
                    </ListItem>
                </List>}
            </CardContent>
        </Card>
    )
}

export default memo(SelectedUserDetails);