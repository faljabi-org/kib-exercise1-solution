import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Grow';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import CallIcon from '@mui/icons-material/Call';
import DeleteIcon from '@mui/icons-material/Delete';

import DeleteConfirmationDialog from 'components/common/DeleteConfirmationDialog';

const SelectedUserActions = ({
    selectedItem,
    onStartEdit,
    onStartEditLocation,
    editLocationStarted,
    editLocationLoading,
    onCancelEditLocation,
    onDelete,
    deleteLoading,
    usersLoading
}) => {

    const { t } = useTranslation();

    const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);

    return (
        <>
            <Stack direction='column' spacing={2}>
                <Fade in timeout={700}>
                    {selectedItem.phone.trim() && <Stack direction='row' spacing={1} width={1} justifyContent='center' alignItems='center'>
                        <LoadingButton
                            sx={theme => ({
                                borderRadius: theme.spacing(1.5),
                                mx: 12,
                                background: theme => `linear-gradient(to right, ${theme.palette.success.light} 0%, ${theme.palette.success.dark} 100%)`
                            })}
                            fullWidth
                            size='large'
                            variant='contained'
                            loadingPosition='start'
                            loading={usersLoading || editLocationLoading}
                            startIcon={<CallIcon />}
                            onClick={_ => window.location.href = `tel:${selectedItem.phone}`}>
                            {t('calls@call')}
                        </LoadingButton>
                    </Stack>}
                </Fade>
                <Stack direction='row' spacing={1} width={1} justifyContent='center' alignItems='center'>
                    <LoadingButton
                        sx={{
                            borderRadius: theme => theme.spacing(1.5)
                        }}
                        variant='outlined'
                        loadingPosition='start'
                        loading={usersLoading || editLocationLoading}
                        startIcon={<EditIcon />}
                        onClick={onStartEdit}>
                        {t('common@edit')}
                    </LoadingButton>
                    <LoadingButton
                        sx={{
                            borderRadius: theme => theme.spacing(1.5)
                        }}
                        variant={editLocationStarted ? 'contained' : 'outlined'}
                        color={editLocationStarted ? 'secondary' : 'primary'}
                        startIcon={<EditLocationAltIcon />}
                        loadingPosition='start'
                        loading={usersLoading || editLocationLoading}
                        onClick={editLocationStarted ? onCancelEditLocation : onStartEditLocation}>
                        {editLocationStarted ? t('common@cancel') : t('common@location')}
                    </LoadingButton>
                    <LoadingButton
                        sx={{
                            borderRadius: theme => theme.spacing(1.5)
                        }}
                        variant='outlined'
                        color='error'
                        startIcon={<DeleteIcon />}
                        loadingPosition='start'
                        loading={usersLoading || deleteLoading}
                        onClick={_ => setDeleteConfirmationDialogOpen(true)}>
                        {t('common@delete')}
                    </LoadingButton>
                </Stack>
            </Stack>
            <DeleteConfirmationDialog
                title={t('users@deleteUser?')}
                contentText={t('users@deleteUserWarning')}
                open={deleteConfirmationDialogOpen}
                onDelete={_ => {
                    onDelete(selectedItem.id);
                    setDeleteConfirmationDialogOpen(false);
                }}
                onCancel={_ => setDeleteConfirmationDialogOpen(false)}
            />
        </>
    )
}

export default memo(SelectedUserActions);