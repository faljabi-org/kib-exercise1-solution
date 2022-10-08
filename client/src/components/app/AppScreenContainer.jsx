import { memo } from 'react';

import Box from '@mui/material/Box';

const AppScreenContainer = ({ children }) => {

    return (
        <Box
            sx={{
                position: 'relative',
                overflowY: 'auto'
            }}>
            {children}
        </Box>
    )
}

export default memo(AppScreenContainer);