import {LatLngExpression} from "leaflet";

export interface Place {
    country: string,
    capital: string,
    location: LatLngExpression,
}
export type Places = Place[];

export async function getPlaces(country: string[] | null) {
    const places:Places = [
        {country: 'France', capital: 'Paris', location: [48.8588255,2.2646352,12]},
        {country: 'Germany', capital: 'Berlin', location: [52.5067296,13.2599284,11]},
        {country: 'England', capital: 'London', location: [51.505, -0.09]},
        {country: 'Spain', capital: 'Barcelona', location: [41.3926417,2.0622515,13]},
    ];
    const filteredPlaces = places.filter(place => country?.includes(place.country));
    const returnedPlaces = (filteredPlaces.length) ? filteredPlaces : places;
    return returnedPlaces;
}

export async function loader({request}) {
    const url = new URL(request.url);
    const searchCountry = url.searchParams.getAll("country");

    const country = searchCountry;
    console.log(`country: ${country}`);
    const places =  await getPlaces(country)

    return places;
}
