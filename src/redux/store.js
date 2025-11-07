import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authenticationSlice';
import hoverMenuReducer from './hoverMenuSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        hoverMenu: hoverMenuReducer,
    }
})