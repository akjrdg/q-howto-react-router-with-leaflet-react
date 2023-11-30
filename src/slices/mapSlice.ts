import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {LatLngExpression} from "leaflet";

export interface MapSlice {
    bound: number[][],
    center: LatLngExpression,
    zoom: number,
}

const initialState: MapSlice = {
    bound: [[50.505, -29.09], [52.505, 29.09]],
    center: [53.505, -0.09],
    zoom: 5,
}

export const mapSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setZoom: (state, action: PayloadAction<number>) => {
            console.log(`   Reducer: setZoom reducer - zooming to ${action.payload}`)
            state.zoom = action.payload
        },
        setBounds: (state, action: PayloadAction<number[][]>) => {
            console.log(`   Reducer: setBounds - setting to ${action.payload}`)
            state.bound = action.payload;
        }
    }
})

export const { setZoom, setBounds } = mapSlice.actions
export const selectZoom = (state: RootState) => state.map.zoom
export const selectCenter = (state: RootState) => state.map.center
export const selectBounds = (state: RootState) => state.map.bound
export default mapSlice.reducer
