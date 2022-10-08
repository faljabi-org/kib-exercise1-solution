import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import useLayoutStore from 'stores/layoutStore';

const MapLoadingIndicator = _ => {

    const { t } = useTranslation();
    const smallScreen = useLayoutStore(state => state.smallScreen);

    return (
        <Stack
            sx={theme => ({
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                ...(smallScreen ? {
                    pb: 'calc(100vh / 3 + env(safe-area-inset-top))'
                } : {
                    pl: `calc(450px + ${theme.spacing(2)})`
                })
            })}
            spacing={1}
            justifyContent='center'
            alignItems='center'>
            <CircularProgress variant='indeterminate' size={24} />
            <Typography sx={{ userSelect: 'none' }} variant='button'>
                {t('common@loading')}
            </Typography>
        </Stack>
    )
}

export default memo(MapLoadingIndicator);