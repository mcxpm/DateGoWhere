import { Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { MdLocationPin } from 'react-icons/md';

export default function LocationAutocomplete({ form }) {
    const placesRef = useRef();
    const [data, setData] = useState([]);
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [placesService, setPlacesService] = useState(null);
    const [debouncedInputValue] = useDebouncedValue(
        form.values.location.description,
        400,
    );

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
            form.setFieldValue('location.name', result.name);
            form.setFieldValue('location.latLng', {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
            });
        });
    };

    useEffect(() => {
        initAutocomplete();
        initPlaces();
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
                {...form.getInputProps('location.description')}
                label="Location"
                required
                variant="filled"
                leftSection={<MdLocationPin />}
                size="xs"
                data={data.map((place) => place.description)}
                // override mantine form input props
                onChange={(newValue) => {
                    form.setFieldValue('location.description', newValue);
                    const place = data.find((place) => place.description == newValue);
                    if (place) {
                        getPlaceDetails(place.place_id);
                    }
                }}
                name="location.description"
            />
        </>
    );
}
