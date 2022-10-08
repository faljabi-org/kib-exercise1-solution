import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ErrorIcon from '@mui/icons-material/Error';
import Refresh from '@mui/icons-material/Refresh';

import { safeAreaTopRightBottomLeft } from 'constants/safeAreaConstants';

const AppError = ({ error }) => {

    const { t } = useTranslation();

    return (
        <Stack
            sx={{
                ...safeAreaTopRightBottomLeft,
                height: '100vh'
            }}
            spacing={1}
            textAlign='center'
            justifyContent='center'
            alignItems='center'>
            <Tooltip title={error.message} placement='bottom' arrow>
                <ErrorIcon sx={{ fontSize: 96 }} color='error' />
            </Tooltip>
            <Typography pt={1} variant='h5' fontWeight='bold'>
                {t('app@error')}
            </Typography>
            <Typography px={3} pb={6}>
                {t('app@checkInternetConnection')}
            </Typography>
            <Button
                size='large'
                variant='outlined'
                startIcon={<Refresh />}
                onClick={_ => window.location.reload()}>
                {t('common@refresh')}
            </Button>
        </Stack>
    )
}

export default memo(AppError);