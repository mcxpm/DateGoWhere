import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { NavBar } from './components/NavBar';

const Layout = () => {
    return (
        <AppShell mih={'100svh'} navbar={{ width: 240 }} padding="md">
            <AppShell.Navbar>
                <NavBar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
