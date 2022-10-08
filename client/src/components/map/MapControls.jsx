import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshIcon from '@mui/icons-material/Refresh';

const MapControls = ({
    visible,
    slideAnimationDirection,
    zoomInDisabled,
    zoomOutDisabled,
    onZoomIn,
    onZoomOut,
    reloadMapVisible,
    onReloadMap
}) => {

    const { t } = useTranslation();

    return (
        <Slide in={visible} direction={slideAnimationDirection} timeout={300}>
            <Stack
                sx={{
                    position: 'fixed',
                    top: {
                        xs: `calc(env(safe-area-inset-top) + 56px)`,
                        sm: `calc(env(safe-area-inset-top) + 64px)`
                    },
                    right: `calc(env(safe-area-inset-right))`,
                    p: 2,
                    overflow: 'hidden'
                }}
                spacing={0.5}>
                <Tooltip title={t('map@zoomIn')} placement='left' arrow>
                    <span>
                        <Fab

                            color='secondary'
                            size='small'
                            disabled={zoomInDisabled}
                            onClick={onZoomIn}>
                            <AddIcon />
                        </Fab>
                    </span>
                </Tooltip>
                <Tooltip title={t('map@zoomOut')} placement='left' arrow>
                    <span>
                        <Fab
                            color='secondary'
                            size='small'
                            disabled={zoomOutDisabled}
                            onClick={onZoomOut}>
                            <RemoveIcon />
                        </Fab>
                    </span>
                </Tooltip>
                {reloadMapVisible && <Tooltip title={t('map@reloadMapLayers')} placement='left' arrow>
                    <Fab
                        color='secondary'
                        size='small'
                        onClick={onReloadMap}>
                        <RefreshIcon />
                    </Fab>
                </Tooltip>}
            </Stack>
        </Slide>
    )
}

export default memo(MapControls);