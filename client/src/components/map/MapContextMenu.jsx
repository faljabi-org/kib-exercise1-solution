import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useMapViewContext } from 'contexts/MapViewContext';
import { useUsersContext } from 'contexts/UsersContext';

const MapContextMenu = _ => {

    const { t } = useTranslation();

    const [menuOpen, setMenuOpen] = useState(true);

    const { mapViewContextMenuLocation, clearMapViewContextMenuLocation } = useMapViewContext();

    const { setUserLocation } = useUsersContext();

    useEffect(_ => {

        if (mapViewContextMenuLocation)
            setMenuOpen(true);

    }, [mapViewContextMenuLocation]);

    return (
        mapViewContextMenuLocation && <Popover
            open={menuOpen}
            anchorReference='anchorPosition'
            anchorPosition={{
                top: mapViewContextMenuLocation.screenPoint.y,
                left: mapViewContextMenuLocation.screenPoint.x
            }}
            onClick={_ => setMenuOpen(false)}
            onBlur={_ => setMenuOpen(false)}>
            <MenuList dense>
                <MenuItem onClick={e => {
                    setUserLocation(mapViewContextMenuLocation.mapPoint);
                    clearMapViewContextMenuLocation();
                }}>
                    <ListItemIcon>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText>{t('users@addUser')}</ListItemText>
                </MenuItem>
            </MenuList>
        </Popover>
    )
}

export default memo(MapContextMenu);
