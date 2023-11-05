import { Avatar, Group, Text } from '@mantine/core';

import classes from './UserTab.module.css';

export function UserTab({ image, name, ...others }) {
    return (
        <div className={classes.user} {...others}>
            <Group>
                <Avatar src={image} radius="xl" size={20} />
                <Text
                    size="sm"
                    weight={500}
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {name}
                </Text>
            </Group>
        </div>
    );
}
