import { MantineProvider, Text } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import Layout from './Layout';
import AuthenticationForm from './components/AuthenticationForm';
import { navBarLoader } from './components/NavBar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        loader: navBarLoader,
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
                        path: 'view/:id',
                        element: <div>view</div>,
                    },
                    {
                        path: 'create/:id',
                        element: <div>create</div>,
                    },
                    {
                        path: 'edit/:id',
                        element: <div>edit</div>,
                    },
                    {
                        path: 'browse',
                        element: <div>browse</div>,
                    },
                ],
            },
            {
                path: 'users',
                element: <div>users</div>,
            },
            {
                path: '',
                element: (
                    <div>
                        landing page - maybe a small hero section to explain what the app
                        does
                    </div>
                ),
            },
            {
                path: 'placeholder',
                element: <div>just a placeholder page</div>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ primaryColor: 'pink' }}
        >
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>,
);
