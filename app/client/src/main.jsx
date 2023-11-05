import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import AuthenticationForm, {
    loader as AuthLoader,
} from './components/AuthenticationForm';
import BrowsePage, {
    loader as browsePageLoader,
} from './components/BrowsePage/BrowsePage';
import CreateIdea, {
    loader as createIdeaLoader,
} from './components/CreateIdea/CreateIdea';
import { ForgotPassword } from './components/ForgotPassword';
import HeroPage from './components/HeroPage/HeroPage';
import TwoPanelLayout from './components/TwoPanelLayout';
import ViewIdeas, { loader as userIdeasLoader } from './components/UserIdeas/ViewIdeas';
import ViewIdea, { loader as viewIdeaLoader } from './components/ViewIdea/ViewIdea';
import ErrorPage from './ErrorPage';
import Layout from './Layout';
import { getUser } from './utils/AuthUtils';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HeroPage />,
            },
            {
                path: 'auth',
                element: <Outlet />,
                children: [
                    { index: true, loader: AuthLoader, element: <AuthenticationForm /> },
                    {
                        path: 'forgot-password',
                        element: <ForgotPassword />,
                    },
                ],
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
                                loader: viewIdeaLoader,
                                path: ':id/view',
                                element: <ViewIdea />,
                            },
                            {
                                path: ':id/edit',
                                element: <div>edit</div>,
                            },
                        ],
                    },
                    {
                        loader: browsePageLoader,
                        path: 'browse',
                        element: <BrowsePage />,
                    },
                ],
            },
            {
                path: 'users',
                element: <Outlet />,
                children: [
                    {
                        path: 'current/ideas',
                        loader: async () => {
                            const user = await getUser();
                            if (user == null) {
                                notifications.show({
                                    color: 'red',
                                    title: 'User not authenticated',
                                    message: 'Please sign in.',
                                    autoClose: 2000,
                                });
                                return redirect('/auth');
                            }
                            return redirect(`/users/${user.uid}/ideas`);
                        },
                    },
                    {
                        path: ':id/ideas',
                        loader: userIdeasLoader,
                        element: <ViewIdeas />,
                    },
                ],
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
