import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const GMap = ({ mapRef }) => {
    return <div style={{ height: '100svh', width: '100%' }} ref={mapRef}></div>;
};

const GBTB_COORDINATES = {
    lat: 1.2816,
    lng: 103.8636,
};
const GMAP_ZOOM = 15;
// const STOPS = [
//     {
//         location: 'Marina Barrage',
//         // lat: 1.2807,
//         // lng: 103.8711,
//     },
//     {
//         location: 'Satay by the Bay',
//         // lat: 1.2821,
//         // lng: 103.8689,
//     },
//     {
//         location: 'Gardens by the Bay',
//         // lat: 1.2816,
//         // lng: 103.8636,
//     },
// ];

const Map = forwardRef(function Map({ activityList }, ref) {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
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

    const calculateAndDisplayRoute = (activityList) => {
        directionsService
            .route({
                origin: activityList[0].location.latLng,
                destination: activityList[activityList.length - 1].location.latLng,
                waypoints: activityList
                    .slice(1, -1)
                    .map((activity) => ({ location: activity.location.latLng })),
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.WALKING,
            })
            .then((response) => {
                console.log(response);
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert('Directions request failed due to ' + e));
    };

    useImperativeHandle(ref, () => ({
        calculateAndDisplayRoute,
    }));

    useEffect(() => {
        initMap();
    }, []);

    useEffect(() => {
        markers.forEach((marker) => marker.setMap(null));
        setMarkers(
            activityList.map((activity) => {
                const marker = new window.google.maps.Marker({
                    position: activity.location.latLng,
                    map,
                });
                return marker;
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activityList]);

    useEffect(() => {
        console.log(markers);
        markers.forEach((marker) => marker.setMap(map));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers]);

    return (
        <>
            {/* <Button
                pos={'absolute'}
                style={{ zIndex: 2 }}
                onClick={calculateAndDisplayRoute}
            >
                Get sample route
            </Button> */}
            <GMap mapRef={mapRef} />
        </>
    );
});

export default Map;
