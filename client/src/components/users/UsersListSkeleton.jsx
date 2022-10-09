import { memo } from 'react';

import Fade from '@mui/material/Fade';
import List from '@mui/material/List';

import UserListItemSkeleton from 'components/users/UserListItemSkeleton';

const UsersListSkeleton = _ => {

    return (
        <Fade in style={{ transitionDelay: '700ms' }}>
            <List sx={{ pb: 7 + 2 + 2 }} disablePadding>
                {[...Array(20).keys()].map(i => <UserListItemSkeleton key={i} />)}
            </List>
        </Fade>
    )
}

export default memo(UsersListSkeleton);