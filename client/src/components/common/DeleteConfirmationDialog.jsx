import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteConfirmationDialog = ({ title, contentText, open, onDelete, onCancel }) => {

    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    {t('common@cancel')}
                </Button>
                <Button
                    color='error'
                    onClick={onDelete}>
                    {t('common@yesDelete')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(DeleteConfirmationDialog);