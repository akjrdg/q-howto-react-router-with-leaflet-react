import './App.css'
import 'leaflet/dist/leaflet.css';
import {Link, useLoaderData, useSearchParams} from "react-router-dom";
import {Places} from "./routes/root";
import {MapContainer, TileLayer} from "react-leaflet";
import {MapController, PlaceMarkers} from "./Map";
import {setBounds, setZoom} from "./slices/mapSlice";
import {useAppDispatch, useAppSelector} from "./store";

function App() {
    return (
        <>
            <PlaceMap/>
            <PlaceList/>
            <PlaceStore/>
        </>
    )
}

function PlaceMap() {
    return (<div id='place-map' className='place-map'>
        <MapContainer scrollWheelZoom={false}>
            <MapController/>
            <PlaceMarkers/>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </MapContainer>
    </div>)
}

function PlaceList() {
    const places = useLoaderData() as Places;
    return (<div id='place-list' className='place-list'>
        {places.length ? (
            <>
                {places.map((place) => (
                    <div key={place.country}>
                        <Link to={`countries/${place.country}`}>{place.country} (capital: {place.capital})</Link>
                    </div>))}
            </>
        ) : (<div/>)}
    </div>)
}

function PlaceStore() {
    const zoom = useAppSelector(state => state.map.zoom);
    const bounds = useAppSelector(state => state.map.bound);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams)
    }

    console.log(`  PlaceStore - search params: ${searchParams}`)
    console.log(...searchParams);

    return <div>
        <div id='place-store'>
            <div>store: zoom: {zoom} bounds: [{bounds[0]} , {bounds[1]}]</div>
            <button onClick={() => dispatch(setZoom(3))}>update-zoom3</button>
            <button onClick={() => dispatch(setZoom(5))}>update-zoom5</button>
            <button onClick={() => dispatch(setBounds([[42.505, -49.09], [55.505, 39.09]]))}>update-bounds</button>
            <button onClick={() => {
                setParam('country', 'France');
            }}>France
            </button>
            <button onClick={() => {
                setParam('country', 'Germany');
            }}>Germany
            </button>
        </div>
    </div>
}
export default App
