import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';

import AuthenticationForm from './components/AuthenticationForm';
import BrowsePage, {
    loader as browsePageLoader,
} from './components/BrowsePage/BrowsePage';
import CreateIdea, {
    loader as createIdeaLoader,
} from './components/CreateIdea/CreateIdea';
import HeroPage from './components/HeroPage/HeroPage';
import TwoPanelLayout from './components/TwoPanelLayout';
import ViewIdeas from './components/UserIdeas/ViewIdeas';
import ViewIdea, { loader as viewIdeaLoader } from './components/ViewIdea/ViewIdea';
import { auth } from './config/firebase';
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
                                loader: viewIdeaLoader,
                                path: 'view/:id',
                                element: <ViewIdea />,
                            },
                            {
                                path: 'edit/:id',
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
                element: <div>users</div>,
            },
            {
                index: true,
                element: <HeroPage />,
            },
            {
                path: 'user/ideas',
                loader: () => {
                    if (auth.currentUser == null) {
                        notifications.show({
                            color: 'red',
                            title: 'User not authenticated',
                            message: 'Please sign in.',
                            autoClose: 2000,
                        });
                        return redirect('/auth');
                    }
                    return redirect(`/${auth.currentUser.uid}/ideas`);
                },
            },
            {
                path: ':id/ideas',
                element: <ViewIdeas />,
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