import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const UsersSearchInput = ({ searchText, onSearchTextChange }) => {

    const { t } = useTranslation();

    return (
        <InputBase
            sx={theme => ({
                p: 0.5,
                backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                borderRadius: theme.spacing(1.5)
            })}
            placeholder={t('users@searchUsers')}
            inputProps={{ maxLength: 255 }}
            value={searchText}
            startAdornment={<InputAdornment position='end'>
                <IconButton disabled>
                    <SearchIcon color='primary' />
                </IconButton>
            </InputAdornment>}
            endAdornment={searchText && <InputAdornment position='start'>
                <IconButton
                    size='small'
                    onClick={_ => onSearchTextChange('')}>
                    <ClearIcon />
                </IconButton>
            </InputAdornment>}
            onChange={e => onSearchTextChange(e.target.value)} />
    )
}

export default memo(UsersSearchInput);