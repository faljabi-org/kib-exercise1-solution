import { memo } from 'react';

import Box from '@mui/material/Box';

const AppBottomSheetHeaderHandle = _ => {

    return (
        <Box sx={theme => ({
            position: 'absolute',
            top: 8,
            left: 'calc(50% - 16px)',
            width: 32,
            height: 6,
            backgroundColor: theme.palette.grey[300],
            borderRadius: 3
        })} />
    )
}

export default memo(AppBottomSheetHeaderHandle);
