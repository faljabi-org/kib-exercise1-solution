import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

import { safeAreaTopRightBottomLeft } from 'constants/safeAreaConstants';

const NotFound = _ => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Stack
            sx={{
                ...safeAreaTopRightBottomLeft,
                height: 1
            }}
            spacing={1}
            textAlign='center'
            justifyContent='center'
            alignItems='center'>
            <img style={{ height: 128, width: 196 }} src={`${process.env.PUBLIC_URL}/images/kib.svg`} alt='KIB' />
            <Typography pt={1} variant='h2' fontWeight='bold'>
                404
            </Typography>
            <Typography px={3} pb={6}>
                {t('app@notFound')}
            </Typography>
            <Button
                size='large'
                variant='outlined'
                startIcon={<HomeIcon />}
                onClick={_ => navigate('/', { replace: true })}>
                {t('app@homepage')}
            </Button>
        </Stack>
    )
}

export default memo(NotFound);