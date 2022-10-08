import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
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
                <Stack direction='row' spacing={1} width={1} justifyContent='center' alignItems='center'>
                    <LoadingButton
                        sx={theme => ({
                            width: 220,
                            borderRadius: theme.spacing(1.5),
                            background: theme => `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`
                        })}
                        size='large'
                        variant='contained'
                        loadingPosition='start'
                        loading={usersLoading || editLocationLoading}
                        startIcon={<EditIcon />}
                        onClick={onStartEdit}>
                        {t('common@edit')}
                    </LoadingButton>
                </Stack>
                <Stack direction='row' spacing={1} width={1} justifyContent='center' alignItems='center'>
                    <LoadingButton
                        sx={{
                            width: 120,
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
                            width: 120,
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