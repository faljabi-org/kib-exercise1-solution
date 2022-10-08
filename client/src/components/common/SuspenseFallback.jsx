import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { safeAreaTopRightBottomLeft } from 'constants/safeAreaConstants';

const SuspenseFallback = ({ loadingText }) => {

    const { t } = useTranslation();

    return (
        <Fade in style={{ transitionDelay: '700ms' }} unmountOnExit>
            <Stack
                sx={{
                    ...safeAreaTopRightBottomLeft,
                    height: 1
                }}
                spacing={1}
                justifyContent='center'
                alignItems='center'>
                <CircularProgress size={24} />
                <Typography sx={{ userSelect: 'none' }} variant='button'>
                    {loadingText || t('common@loading')}
                </Typography>
            </Stack>
        </Fade>
    )
}

export default memo(SuspenseFallback);