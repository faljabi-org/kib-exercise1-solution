import { memo } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import { USER_LIST_ITEM_SIZE } from 'constants/usersConstants';

const ContactListItemSkeleton = _ => {

    return (
        <ListItemButton
            sx={{ height: USER_LIST_ITEM_SIZE }}>
            <ListItemAvatar>
                <Avatar>
                    <Skeleton
                        variant='circular'
                        animation='wave'
                    />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton width='70%' />}
                secondary={<Skeleton width='30%' />}
            />
        </ListItemButton>
    )
}

export default memo(ContactListItemSkeleton);