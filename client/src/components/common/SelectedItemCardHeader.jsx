import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha } from '@mui/system';

import CardHeader from '@mui/material/CardHeader';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const SelectedItemCardHeader = ({

    title = '',
    titleColor = 'text.primary',
    subtitle = '',
    subtitleColor = 'text.secondary',
    iconColor,
    iconBackgroundColor = alpha(iconColor, 0.1),
    Icon = QuestionMarkIcon,
    ActionIcon = TravelExploreIcon,
    actionLoading = false,
    onActionClick = null

}) => {

    const { t } = useTranslation();

    return (
        <CardHeader
            avatar={<Avatar
                sx={{
                    color: iconColor,
                    background: iconBackgroundColor
                }}>
                <Icon />
            </Avatar>}
            title={title}
            subheader={subtitle}
            titleTypographyProps={{
                sx: {
                    color: titleColor,
                    fontWeight: 'bold',
                    fontSize: 16,
                    wordBreak: 'break-word'
                }
            }}
            subheaderTypographyProps={{
                sx: {
                    color: subtitleColor,
                    wordBreak: 'break-word'
                }
            }}
            action={actionLoading ?
                <Fade in style={{ transitionDelay: '700ms' }} unmountOnExit>
                    <IconButton disabled>
                        <CircularProgress size={24} />
                    </IconButton>
                </Fade>
                :
                onActionClick && <Tooltip title={t('map@zoomIn')} placement='left' arrow>
                    <IconButton
                        onClick={onActionClick}>
                        <ActionIcon />
                    </IconButton>
                </Tooltip>}
        />
    )
}

export default memo(SelectedItemCardHeader);