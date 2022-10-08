import { memo } from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { USER_LIST_ITEM_SIZE } from 'constants/usersConstants';

const UserListItemSkeleton = _ => {

    return (
        <Card sx={{ borderRadius: theme => theme.spacing(3), background: 'transparent' }}>
            <CardActionArea sx={{ height: USER_LIST_ITEM_SIZE }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <Skeleton
                                variant='circular'
                                animation='wave'
                            />
                        </Avatar>}
                    title={<Skeleton width='50%' />}
                    subheader={<Skeleton width='40%' />}
                />
                <CardContent>
                    <List sx={{ maxWidth: 400 }} dense disablePadding>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <Skeleton
                                    variant='circular'
                                    animation='wave'
                                    width={24}
                                    height={24}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Skeleton width='80%' />}
                                secondary={<Skeleton width='30%' />} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <Skeleton
                                    variant='circular'
                                    animation='wave'
                                    width={24}
                                    height={24}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Skeleton width='90%' />}
                                secondary={<Skeleton width='30%' />} />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default memo(UserListItemSkeleton);