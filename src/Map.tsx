import {LatLngExpression} from "leaflet";
import {Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useLoaderData, useSearchParams} from "react-router-dom";
import {Places} from "./routes/root";
import {selectCenter, selectZoom, setBounds} from "./slices/mapSlice";
import {useAppDispatch, useAppSelector} from "./store";
import {useEffect} from "react";

interface PlaceMarkerProps {
    position: LatLngExpression,
    popupText: string,
}

function PlaceMarker({position, popupText}: PlaceMarkerProps) {
    return <Marker position={position}><Popup>{popupText}</Popup></Marker>
}

export function PlaceMarkers() {
    const places = useLoaderData() as Places;
    return <>
        {
            places.map((place, i) => {
                return (<PlaceMarker position={place.location} popupText={place.country} key={i}/>)
            })
        }
    </>
}

export function MapController() {

    const map = useMap();
    const center = useAppSelector(selectCenter);
    const zoom = useAppSelector(selectZoom);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom])

    console.log(`   MapController - state value: center: ${center} , zoom: ${zoom}`)

    useMapEvents({
        moveend(e) {
            console.log(`MapController - map moved:${e.target.getBounds().toBBoxString()}`)

            const bounds = e.target.getBounds();
            const boundNumbers: number[][] = [
                [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
                [bounds.getNorthEast().lat, bounds.getNorthEast().lng]
            ]
            dispatch(setBounds(boundNumbers));
            searchParams.set('bound', boundNumbers.toString());
            setSearchParams(searchParams)
        }
    })
    return null
}
