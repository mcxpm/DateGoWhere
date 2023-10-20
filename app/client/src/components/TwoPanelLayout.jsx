import { Wrapper } from '@googlemaps/react-wrapper';
import { SimpleGrid } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const TwoPanelLayout = () => {
    return (
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <SimpleGrid h={'100dvh'} cols={{ base: 1, sm: 2 }} spacing={0}>
                <Outlet />
            </SimpleGrid>
        </Wrapper>
    );
};

export default TwoPanelLayout;
