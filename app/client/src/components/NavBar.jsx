import {
    Button,
    Group,
    Navbar,
    Text,
    UnstyledButton,
    createStyles,
    getStylesRef,
    rem,
} from '@mantine/core';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    MdLogout,
    MdManageAccounts,
    MdPersonSearch,
    MdPostAdd,
    MdViewModule,
} from 'react-icons/md';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../config/firebase';
import { UserTab } from './UserTab';

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                .color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .color,
            },
        },
    },
}));

const data = [
    { link: '/ideas/browse', label: 'Browse Ideas', icon: MdViewModule },
    { link: '/ideas/create/1', label: 'Create New Idea', icon: MdPostAdd },
    { link: '/placeholder', label: 'Your Ideas', icon: MdPersonSearch },
];

export const navBarLoader = () => {
    return auth.currentUser;
};

export function NavBar() {
    const { classes, cx } = useStyles();

    const location = useLocation();
    const links = data.map((item) => (
        <Link
            className={cx(classes.link, {
                [classes.linkActive]: item.link === location.pathname,
            })}
            to={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} size={20} />
            <span>{item.label}</span>
        </Link>
    ));

    // const [user] = useAuthState(auth);
    const user = useLoaderData();

    const navigate = useNavigate();

    return (
        <Navbar width={{ sm: 240 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Text
                            fz={'lg'}
                            fw={'bold'}
                            variant="gradient"
                            gradient={{ from: 'pink', to: 'red', deg: 45 }}
                            ta={'center'}
                        >
                            DateGoWhere
                        </Text>
                    </Link>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {user ? (
                    <>
                        <UserTab
                            name={
                                user.displayName
                                    ? user.displayName
                                    : user.email.split('@')[0]
                            }
                            email={user.email}
                            image={user.photoURL}
                        />
                        <a
                            href="#"
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <MdManageAccounts
                                className={classes.linkIcon}
                                stroke={1.5}
                                size={20}
                            />
                            <span>Manage account</span>
                        </a>

                        <UnstyledButton
                            sx={{ width: '100%' }}
                            className={classes.link}
                            onClick={() => {
                                signOut(auth);
                            }}
                        >
                            <MdLogout
                                className={classes.linkIcon}
                                stroke={1.5}
                                size={20}
                            />
                            <span>Logout</span>
                        </UnstyledButton>
                    </>
                ) : (
                    <Button
                        fullWidth
                        onClick={() => {
                            navigate('/auth');
                        }}
                    >
                        Log in
                    </Button>
                )}
            </Navbar.Section>
        </Navbar>
    );
}
