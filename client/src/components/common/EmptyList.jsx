import { memo } from 'react';

import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const EmptyList = ({ title, tagline, Icon }) => {

    return (
        <Fade in timeout={300}>
            <Stack p={1} minHeight={1} alignItems='center' justifyContent='center'>
                <Icon sx={{ fontSize: 48 }} color='disabled' />
                <Typography
                    pt={1}
                    variant='subtitle2'
                    textAlign='center'>
                    {title}
                </Typography>
                <Typography
                    variant='body2'
                    color='text.secondary'
                    textAlign='center'>
                    {tagline}
                </Typography>
            </Stack>
        </Fade>
    )
}

export default memo(EmptyList);