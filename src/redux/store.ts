import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {reducer} from './slice';

const rootReducer = combineReducers({
    reducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch