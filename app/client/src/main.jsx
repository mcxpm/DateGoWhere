import '@mantine/core/styles.css';

import { Wrapper } from '@googlemaps/react-wrapper';
import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import AuthenticationForm from './components/AuthenticationForm';
import HeroPage from './components/HeroPage/HeroPage';
import Map from './components/Map';
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
                        path: 'view/:id',
                        element: <div>view</div>,
                    },
                    {
                        path: 'create/:id',
                        element: (
                            <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                                <Map />
                            </Wrapper>
                        ),
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
                        <HeroPage />
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

const theme = createTheme({
    primaryColor: 'pink',
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>,
);
