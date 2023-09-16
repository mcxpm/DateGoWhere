import { AppShell, useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { NavBar } from './components/NavBar';

const Layout = () => {
    const theme = useMantineTheme();

    return (
        <main style={{ minHeight: '100svh' }}>
            <AppShell
                styles={{
                    main: {
                        background:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={<NavBar />}
            >
                <Outlet />
            </AppShell>
        </main>
    );
};

export default Layout;
