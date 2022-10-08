import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha } from '@mui/system';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';

import { USER_LIST_ITEM_SIZE } from 'constants/usersConstants';

const UserListItem = ({ item, onSelect, onHover, onBlur }) => {

    const { t } = useTranslation();

    const {
        id, name, username,
        email, company: { name: companyName }
    } = item;

    return (
        <Card
            sx={{ borderRadius: theme => theme.spacing(3), background: 'transparent' }}
            onClick={_ => onSelect(id)}
            onMouseEnter={_ => onHover(id)}
            onMouseLeave={_ => onBlur(id)}>
            <CardActionArea sx={{ height: USER_LIST_ITEM_SIZE }}>
                <CardHeader
                    avatar={<Avatar
                        sx={{
                            color: '#0288d1',
                            background: alpha('#0288d1', 0.1)
                        }}>
                        <AccountCircleIcon />
                    </Avatar>}
                    title={name}
                    subheader={`@${username}`}
                    titleTypographyProps={{
                        fontWeight: 'bold'
                    }}
                />
                <CardContent>
                    <List sx={{ maxWidth: 400 }} dense disablePadding>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <BusinessCenterIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={companyName}
                                secondary={t('users@userCompany')}
                                primaryTypographyProps={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={email}
                                secondary={t('users@userEmail')}
                                primaryTypographyProps={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default memo(UserListItem);