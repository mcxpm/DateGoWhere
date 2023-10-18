import '@mantine/core/styles.css';

import { Wrapper } from '@googlemaps/react-wrapper';
import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import AuthenticationForm from './components/AuthenticationForm';
import BrowsePage from './components/BrowsePage/BrowsePage';
import CreateIdea from './components/CreateIdea/CreateIdea';
import HeroPage from './components/HeroPage/HeroPage';
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
                        path: 'view/:id',
                        element: <div>view</div>,
                    },
                    {
                        path: 'create/:id',
                        element: (
                            <Wrapper
                                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                libraries={['places']}
                            >
                                <CreateIdea />
                            </Wrapper>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: <div>edit</div>,
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
        </MantineProvider>
    </React.StrictMode>,
);
