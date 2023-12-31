import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import AuthenticationForm, {
    loader as AuthLoader,
} from './components/auth/AuthenticationForm';
import { ForgotPassword } from './components/auth/ForgotPassword';
import ErrorPage from './components/GlobalError';
import Home from './components/home/Home';
import BrowsePage, {
    loader as browsePageLoader,
} from './components/ideas/BrowseIdeas/BrowseIdeas';
import CreateIdea, {
    loader as createIdeaLoader,
} from './components/ideas/CreateIdea/CreateIdea';
import EditIdea, { loader as editIdeaLoader } from './components/ideas/EditIdea/EditIdea';
import ViewIdea, { loader as viewIdeaLoader } from './components/ideas/ViewIdea/ViewIdea';
import Layout from './components/Layout';
import TwoPanelLayout from './components/TwoPanelLayout';
import UserIdeas, {
    loader as userIdeasLoader,
} from './components/users/UserIdeas/UserIdeas';
import { getUser } from './utils/AuthUtils';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
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
                                loader: editIdeaLoader,
                                element: <EditIdea />,
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
                        element: <UserIdeas />,
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
            <ModalsProvider>
                <RouterProvider router={router} />
                <Notifications />
            </ModalsProvider>
        </MantineProvider>
    </React.StrictMode>,
);
