import { Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { MdLocationPin } from 'react-icons/md';

export default function LocationAutocomplete({ value, handleChangeActivity, idx }) {
    const placesRef = useRef();
    const [data, setData] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placesService, setPlacesService] = useState(null);
    const [debouncedInputValue] = useDebouncedValue(value, 400);

    const initAutocomplete = () => {
        const newAutocompleteService =
            new window.google.maps.places.AutocompleteService();
        setAutocompleteService(newAutocompleteService);
    };

    const initPlaces = () => {
        const newPlacesService = new window.google.maps.places.PlacesService(
            placesRef.current,
        );
        setPlacesService(newPlacesService);
    };

    const getPlaceDetails = (place_id) => {
        placesService.getDetails({ placeId: place_id }, (result) => {
            console.log('google.maps.places.getDetails', result);
            handleChangeActivity('location', idx, {
                name: result.name,
                latLng: result.geometry.location,
            });
        });
    };

    useEffect(() => {
        initAutocomplete();
        initPlaces();
        console.log(window.google.maps.places);
    }, []);

    useEffect(() => {
        let active = true;

        if (debouncedInputValue === '') {
            setData(debouncedInputValue ? [debouncedInputValue] : []);
            return undefined;
        }

        if (active && autocompleteService) {
            autocompleteService.getPlacePredictions(
                { input: debouncedInputValue, componentRestrictions: { country: 'sg' } },
                (results) => {
                    console.log(
                        'google.maps.places.AutocompleteService.getPlacePredictions',
                        results,
                    );
                    setData(results ? results : []);
                },
            );
        }

        return () => {
            active = false;
        };
    }, [debouncedInputValue, autocompleteService]);

    return (
        <>
            <div className="" ref={placesRef}></div>
            <Autocomplete
                label="Location"
                required
                variant="filled"
                leftSection={<MdLocationPin />}
                size="xs"
                data={data.map((place) => place.description)}
                value={value}
                onChange={(newValue) => {
                    const place = data.find((place) => place.description == newValue);
                    if (place) {
                        getPlaceDetails(place.place_id);
                    }
                    handleChangeActivity('location', idx, { description: newValue });
                }}
            />
        </>
    );
}
