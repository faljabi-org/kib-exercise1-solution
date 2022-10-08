import { memo } from 'react';

import AppScreenContainer from 'components/app/AppScreenContainer';
import Users from 'components/users/Users';

const UsersScreen = _ => {

    return (
        <AppScreenContainer>
            <Users />
        </AppScreenContainer>
    )
}

export default memo(UsersScreen);