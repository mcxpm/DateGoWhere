import { Button, Group, Text, UnstyledButton } from '@mantine/core';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    MdHome,
    MdLogout,
    MdManageAccounts,
    MdPersonSearch,
    MdPostAdd,
    MdViewModule,
} from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../config/firebase';
import classes from './NavBar.module.css';
import { UserTab } from './UserTab';

const data = [
    { link: '/', label: 'Home', icon: MdHome },
    { link: '/ideas/browse', label: 'Browse Ideas', icon: MdViewModule },
    { link: '/ideas/create', label: 'Create New Idea', icon: MdPostAdd },
    { link: '/user/ideas', label: 'Your Ideas', icon: MdPersonSearch },
];

export function NavBar() {
    const location = useLocation();
    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.link === location.pathname || undefined}
            to={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} size={20} />
            <span>{item.label}</span>
        </Link>
    ));

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    return (
        <div className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
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
            </div>

            <div className={classes.footer}>
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
                            className={classes.link}
                            onClick={() => {
                                signOut(auth);
                                navigate(0);
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
            </div>
        </div>
    );
}
