import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 47.97809341724494,
    lng: 7.802252636899373
};

function KontaktMap(): React.JSX.Element {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onUnmount={onUnmount}
            options={{
                styles: [
                    {
                        "featureType": "all",
                        "stylers": [
                            { 'saturation': -100 },
                            { 'gamma': 0.8 },
                            { 'lightness': 4 },
                            { 'visibility': 'on' },
                        ]
                    }, {
                        "featureType": "poi",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    }
                ]
            }}
        >
            <Marker position={center} title="NeunOderVier" />
            <></>
        </GoogleMap>
    ) : <></>;
}

export default React.memo(KontaktMap);
