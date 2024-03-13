import Map, {
	Marker,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
	GeolocateControl,
	AttributionControl,
	useMap,
	// Source,
	// Layer,
} from 'react-map-gl';
import MapPin from '@/components/MapPin';
import React, { useEffect, useState } from 'react';

const defaultMapState = {
	lng: 25.0,
	lat: 43.0,
	zoom: 1,
	selectedZoom: 15,
};

interface EstateLocationMapProps {
	lng?: string | null;
	lat?: string | null;
    hidden?: boolean;
}

export const EstateLocationMap = React.memo(({ lng, lat, hidden }: EstateLocationMapProps) => {
	const { estateMap } = useMap();

	// Map state
	const [mapViewState, setMapViewState] = useState({
		longitude: Number(lng ?? defaultMapState.lng),
		latitude: Number(lat ?? defaultMapState.lat),
		zoom: lng ? defaultMapState.selectedZoom : defaultMapState.zoom,
	});

	// Fly to estate location
	useEffect(() => {
		estateMap && estateMap.resize();
		if (lng && lat && estateMap) {
			estateMap.flyTo({
				center: [Number(lng), Number(lat)],
				zoom: defaultMapState.selectedZoom,
			});
		}
	}, [lng, lat, estateMap]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Map
			id="estateMap"
			reuseMaps
			mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
			attributionControl={false}
			{...mapViewState}
			onMove={(evt) => setMapViewState(evt.viewState)}
			style={{ width: '100%', height: 400, borderRadius: '10px', display: hidden ? 'none' : 'block' }}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		>
			<GeolocateControl position="top-right" />
			<AttributionControl compact />
			<FullscreenControl position="top-right" />
			<NavigationControl position="top-right" />
			<ScaleControl />
			{lng && lat && (
				<Marker
					key={`${lng}-${lat}`}
					longitude={Number(lng)}
					latitude={Number(lat)}
					onClick={(e) => {
						// If we let the click event propagates to the map, it will immediately close the popup
						// with `closeOnClick: true`
						e.originalEvent.stopPropagation();
					}}
				>
					<MapPin />
				</Marker>
			)}
		</Map>
	);
});
