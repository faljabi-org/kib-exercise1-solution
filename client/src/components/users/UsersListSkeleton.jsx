import { memo } from 'react';

import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';

import UserListItemSkeleton from 'components/users/UserListItemSkeleton';

const UsersListSkeleton = _ => {

    return (
        <Fade in style={{ transitionDelay: '700ms' }}>
            <Stack p={2} pb={7 + 2 + 2} spacing={1}>
                {[...Array(5).keys()].map(i => <UserListItemSkeleton key={i} />)}
            </Stack>
        </Fade>
    )
}

export default memo(UsersListSkeleton);