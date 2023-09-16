import { Avatar, Group, Menu, Text, UnstyledButton, createStyles } from '@mantine/core';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { MdExpandMore, MdLogout } from 'react-icons/md';

import { auth } from '../config/firebase';

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));
const UserMenu = ({ user }) => {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group spacing={7}>
                        <Avatar
                            src={user.photoURL}
                            alt={user.displayName}
                            radius="xl"
                            size={20}
                        />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                            {user.displayName ? user.displayName : user.email}
                        </Text>
                        <MdExpandMore />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item icon={<MdLogout />}>Logout</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" icon={<MdLogout />} onClick={() => signOut(auth)}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default UserMenu;
