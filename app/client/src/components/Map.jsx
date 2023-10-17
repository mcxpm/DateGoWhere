import { Box, Button, Paper, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

const GMap = ({ mapRef }) => {
    return <div style={{ height: '100svh', width: '100%' }} ref={mapRef}></div>;
};

const GBTB_COORDINATES = {
    lat: 1.2816,
    lng: 103.8636,
};
const GMAP_ZOOM = 15;
const STOPS = [
    {
        location: 'Marina Barrage',
        // lat: 1.2807,
        // lng: 103.8711,
    },
    {
        location: 'Satay by the Bay',
        // lat: 1.2821,
        // lng: 103.8689,
    },
    {
        location: 'Gardens by the Bay',
        // lat: 1.2816,
        // lng: 103.8636,
    },
];

const Map = () => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    const initMap = () => {
        const newMap = new window.google.maps.Map(mapRef.current, {
            center: GBTB_COORDINATES,
            zoom: GMAP_ZOOM,
        });
        setMap(newMap);
        const newDirectionsService = new window.google.maps.DirectionsService();
        setDirectionsService(newDirectionsService);
        const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
        newDirectionsRenderer.setMap(newMap);
        setDirectionsRenderer(newDirectionsRenderer);
    };

    const calculateAndDisplayRoute = () => {
        directionsService
            .route({
                origin: STOPS[0].location,
                destination: STOPS[STOPS.length - 1].location,
                waypoints: STOPS.slice(1, -1),
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.WALKING,
            })
            .then((response) => {
                console.log(response);
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert('Directions request failed due to ' + e));
    };

    useEffect(() => {
        initMap();
    }, []);

    return (
        <Box pos={'relative'}>
            <Paper
                pos={'absolute'}
                style={{ zIndex: 1 }}
                m={'xs'}
                p={'lg'}
                h={'40%'}
                w={'40%'}
            >
                <Text>THIS IS AN OVERLAY</Text>
                <Button onClick={calculateAndDisplayRoute}>Get sample route</Button>
            </Paper>
            <GMap mapRef={mapRef} />
        </Box>
    );
};

export default Map;
