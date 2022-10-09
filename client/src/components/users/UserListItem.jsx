import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha } from '@mui/system';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { USER_LIST_ITEM_SIZE, USER_MAP_ITEM_COLOR } from 'constants/usersConstants';

const UserListItem = ({ item, onSelect, onHover, onBlur }) => {

    const { t } = useTranslation();

    const { id, name, username } = item;

    return (
        <ListItemButton
            sx={{ height: USER_LIST_ITEM_SIZE }}
            onClick={_ => onSelect(id)}
            onMouseEnter={_ => onHover(id)}
            onMouseLeave={_ => onBlur(id)}>
            <ListItemAvatar>
                <Avatar sx={{
                    color: USER_MAP_ITEM_COLOR,
                    background: alpha(USER_MAP_ITEM_COLOR, 0.1)
                }}>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={name || t('common@NA')}
                secondary={`@${username}` || t('common@NA')}
                primaryTypographyProps={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
                secondaryTypographyProps={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            />
        </ListItemButton>
    )
}

export default memo(UserListItem);