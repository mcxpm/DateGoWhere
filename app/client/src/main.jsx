import '@mantine/core/styles.css';

import { Wrapper } from '@googlemaps/react-wrapper';
import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import AuthenticationForm from './components/AuthenticationForm';
import BrowsePage from './components/BrowsePage/BrowsePage';
import CreateIdea, {
    loader as createIdeaLoader,
} from './components/CreateIdea/CreateIdea';
import HeroPage from './components/HeroPage/HeroPage';
import TestViewIdea, {
    loader as testViewIdeaLoader,
} from './components/ViewIdea/TestViewIdea';
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
                        loader: createIdeaLoader,
                        path: 'create',
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
                        path: 'browse',
                        element: <BrowsePage />,
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
                path: 'users',
                element: <div>users</div>,
            },
            {
                path: '',
                element: <HeroPage />,
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
