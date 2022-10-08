import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Error = ({ errorMessage }) => {

    const { t } = useTranslation();

    return (
        <Alert sx={{ m: 2 }} severity='error'>
            <AlertTitle>
                {t('common@error')}
            </AlertTitle>
            {errorMessage}
        </Alert>
    )
}

export default memo(Error);