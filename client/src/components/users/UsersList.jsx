import { forwardRef, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Box from '@mui/system/Box';

import UserListItem from 'components/users/UserListItem';

import { USER_LIST_ITEM_SIZE } from 'constants/usersConstants';

const UsersList = forwardRef(({ items, onItemSelect, onItemHover, onItemBlur }, ref) => {

    return (
        <Box
            height={1}
            overflow='hidden'>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        style={{
                            direction: 'inherit'
                        }}
                        outerRef={ref}
                        height={height}
                        width={width}
                        itemData={items}
                        itemCount={items.length}
                        itemSize={USER_LIST_ITEM_SIZE + 8}>
                        {({ data, index, style }) => {
                            return (
                                <Box
                                    sx={{
                                        ...style,
                                        height: USER_LIST_ITEM_SIZE + 88
                                    }}>
                                    <UserListItem
                                        key={data[index].ID}
                                        item={data[index]}
                                        onSelect={onItemSelect}
                                        onHover={onItemHover}
                                        onBlur={onItemBlur}
                                    />
                                </Box>
                            )
                        }}
                    </List>
                )}
            </AutoSizer>
        </Box>
    )
})

export default memo(UsersList);