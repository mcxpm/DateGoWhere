import { Avatar, Group, Text, UnstyledButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
}));

export function UserTab({ image, name, email, icon, ...others }) {
    const { classes } = useStyles();

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
