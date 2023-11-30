import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counterSlice";
import mapReducer from './slices/mapSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        map: mapReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
