import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import AuthenticationForm from './components/AuthenticationForm';
import BrowsePage from './components/BrowsePage/BrowsePage';
import CreateIdea, {
    loader as createIdeaLoader,
} from './components/CreateIdea/CreateIdea';
import HeroPage from './components/HeroPage/HeroPage';
import TwoPanelLayout from './components/TwoPanelLayout';
import TestViewIdea, {
    loader as testViewIdeaLoader,
} from './components/ViewIdea/TestViewIdea';
import ViewIdea from './components/ViewIdea/ViewIdea';
import ErrorPage from './ErrorPage';
import Layout from './Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'auth',
                element: <AuthenticationForm />,
            },
            {
                path: 'ideas',
                element: <Outlet />,
                children: [
                    {
                        path: '',
                        element: <TwoPanelLayout />,
                        children: [
                            {
                                loader: createIdeaLoader,
                                path: 'create',
                                element: <CreateIdea />,
                            },
                            {
                                loader: testViewIdeaLoader,
                                path: 'view/:id',
                                element: <TestViewIdea />,
                            },
                            {
                                path: 'edit/:id',
                                element: <div>edit</div>,
                            },
                        ],
                    },
                    {
                        path: 'browse',
                        element: <BrowsePage />,
                    },
                ],
            },
            {
                path: 'users',
                element: <div>users</div>,
            },
            {
                path: '',
                element: <HeroPage />,
            },
            {
                path: 'placeholder',
                element: <ViewIdea />,
            },
        ],
    },
]);

const theme = createTheme({
    primaryColor: 'pink',
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <RouterProvider router={router} />
            <Notifications />
        </MantineProvider>
    </React.StrictMode>,
);
