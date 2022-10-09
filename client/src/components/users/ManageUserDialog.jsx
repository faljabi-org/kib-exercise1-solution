import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { safeAreaTopRightBottomLeft } from 'constants/safeAreaConstants';

import useFormInput from 'hooks/common/use-form-input';

import useLayoutStore from 'stores/layoutStore';

const ManageUserDialog = ({
    mode,
    onAdd,
    addLoading,
    onCancelAdd,
    selectedItem,
    onEdit,
    onCancelEdit,
    editLoading,
    validationResults
}) => {

    const { t } = useTranslation();
    const smallScreen = useLayoutStore(state => state.smallScreen);

    let name = useFormInput(mode ? selectedItem.name : '');
    let username = useFormInput(mode ? selectedItem.username : '');
    let email = useFormInput(mode ? selectedItem.email : '');
    let phone = useFormInput(mode ? selectedItem.phone : '');
    let website = useFormInput(mode ? selectedItem.website : '');
    let companyName = useFormInput(mode ? selectedItem.company.name : '');
    let companyCatchPhrase = useFormInput(mode ? selectedItem.company.catchPhrase : '');
    let companyBS = useFormInput(mode ? selectedItem.company.bs : '');
    let city = useFormInput(mode ? selectedItem.address.city : '');
    let street = useFormInput(mode ? selectedItem.address.street : '');
    let suite = useFormInput(mode ? selectedItem.address.suite : '');
    let zipcode = useFormInput(mode ? selectedItem.address.zipcode : '');

    const submitUserForm = useCallback(_ => {

        let user = {
            name: name.value.trim(),
            username: username.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            website: website.value.trim(),
            company: {
                name: companyName.value.trim(),
                catchPhrase: companyCatchPhrase.value.trim(),
                bs: companyBS.value.trim()
            },
            address: {
                city: city.value.trim(),
                street: street.value.trim(),
                suite: suite.value.trim(),
                zipcode: zipcode.value.trim()
            }
        };

        mode ? onEdit(user) : onAdd(user);

    }, [mode, name, username, email, phone, website, companyName, companyCatchPhrase, companyBS, city, street, suite, zipcode, onAdd, onEdit]);

    const cancelSubmitUserForm = useCallback(_ => {

        mode ? onCancelEdit() : onCancelAdd();

    }, [mode, onCancelEdit, onCancelAdd]);

    const onSubmit = useCallback(e => {

        e.preventDefault();

        if (addLoading || editLoading)
            return;

        submitUserForm();

    }, [addLoading, editLoading, submitUserForm]);

    return (
        <Dialog
            open
            maxWidth='md'
            fullScreen={smallScreen}
            onClose={cancelSubmitUserForm}
            PaperProps={{
                sx: {
                    ...(smallScreen && safeAreaTopRightBottomLeft)
                }
            }}>
            <Box component='form' noValidate onSubmit={onSubmit}>
                <DialogTitle>
                    {mode ? t('users@editUser') : t('users@addUser')}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>

                        {/* Basic Information */}

                        <Grid item xs={12} md={6}>
                            <TextField
                                inputRef={name.ref}
                                fullWidth
                                required
                                label={t('users@name')}
                                placeholder={t('users@addName')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={name.value}
                                onChange={name.onChange}
                                error={!!validationResults.find(r => r.name)}
                                helperText={validationResults.find(r => r.name)?.name}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                inputRef={username.ref}
                                fullWidth
                                required
                                label={t('users@username')}
                                placeholder={t('users@addUsername')}
                                inputProps={{ maxLength: 30 }}
                                InputLabelProps={{ shrink: true }}
                                value={username.value}
                                onChange={username.onChange}
                                error={!!validationResults.find(r => r.username)}
                                helperText={validationResults.find(r => r.username)?.username}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                inputRef={email.ref}
                                fullWidth
                                required
                                label={t('users@email')}
                                placeholder={t('users@addEmail')}
                                inputProps={{ maxLength: 55 }}
                                InputLabelProps={{ shrink: true }}
                                value={email.value}
                                onChange={email.onChange}
                                error={!!validationResults.find(r => r.email)}
                                helperText={validationResults.find(r => r.email)?.email}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                inputRef={phone.ref}
                                fullWidth
                                required
                                label={t('users@phone')}
                                placeholder={t('users@addPhone')}
                                inputProps={{ maxLength: 30 }}
                                InputLabelProps={{ shrink: true }}
                                value={phone.value}
                                onChange={phone.onChange}
                                error={!!validationResults.find(r => r.phone)}
                                helperText={validationResults.find(r => r.phone)?.phone}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                inputRef={website.ref}
                                fullWidth
                                label={t('users@website')}
                                placeholder={t('users@addWebsite')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={website.value}
                                onChange={website.onChange}
                                error={!!validationResults.find(r => r.website)}
                                helperText={validationResults.find(r => r.website)?.website}>
                            </TextField>
                        </Grid>

                        {/* Company Information */}

                        <Grid item xs={12} md={6}>
                            <TextField
                                inputRef={companyName.ref}
                                fullWidth
                                required
                                label={t('users@companyName')}
                                placeholder={t('users@addCompanyName')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={companyName.value}
                                onChange={companyName.onChange}
                                error={!!validationResults.find(r => r.companyName)}
                                helperText={validationResults.find(r => r.companyName)?.companyName}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                inputRef={companyCatchPhrase.ref}
                                fullWidth
                                label={t('users@companyCatchPhrase')}
                                placeholder={t('users@addCompanyCatchPhrase')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={companyCatchPhrase.value}
                                onChange={companyCatchPhrase.onChange}
                                error={!!validationResults.find(r => r.companyCatchPhrase)}
                                helperText={validationResults.find(r => r.companyCatchPhrase)?.companyCatchPhrase}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                inputRef={companyBS.ref}
                                fullWidth
                                label={t('users@companyBS')}
                                placeholder={t('users@addCompanyBS')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={companyBS.value}
                                onChange={companyBS.onChange}
                                error={!!validationResults.find(r => r.companyBS)}
                                helperText={validationResults.find(r => r.companyBS)?.companyBS}>
                            </TextField>
                        </Grid>

                        {/* Address Information */}

                        <Grid item xs={6} md={3}>
                            <TextField
                                inputRef={city.ref}
                                fullWidth
                                required
                                label={t('users@city')}
                                placeholder={t('users@addCity')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={city.value}
                                onChange={city.onChange}
                                error={!!validationResults.find(r => r.city)}
                                helperText={validationResults.find(r => r.city)?.city}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                inputRef={street.ref}
                                fullWidth
                                required
                                label={t('users@street')}
                                placeholder={t('users@addStreet')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={street.value}
                                onChange={street.onChange}
                                error={!!validationResults.find(r => r.street)}
                                helperText={validationResults.find(r => r.street)?.street}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                inputRef={suite.ref}
                                fullWidth
                                label={t('users@suite')}
                                placeholder={t('users@addSuite')}
                                inputProps={{ maxLength: 100 }}
                                InputLabelProps={{ shrink: true }}
                                value={suite.value}
                                onChange={suite.onChange}
                                error={!!validationResults.find(r => r.suite)}
                                helperText={validationResults.find(r => r.suite)?.suite}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                inputRef={zipcode.ref}
                                fullWidth
                                label={t('users@zipcode')}
                                placeholder={t('users@addZipcode')}
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{ shrink: true }}
                                value={zipcode.value}
                                onChange={zipcode.onChange}
                                error={!!validationResults.find(r => r.zipcode)}
                                helperText={validationResults.find(r => r.zipcode)?.zipcode}>
                            </TextField>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={cancelSubmitUserForm}>
                        {t('common@cancel')}
                    </Button>
                    <LoadingButton
                        variant='contained'
                        type='submit'
                        startIcon={mode ? <EditIcon /> : <AddIcon />}
                        loadingPosition='start'
                        loading={addLoading || editLoading}
                        onClick={onSubmit}>
                        {mode ? t('common@save') : t('common@add')}
                    </LoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default memo(ManageUserDialog);