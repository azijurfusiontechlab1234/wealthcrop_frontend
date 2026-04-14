import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authenticationSlice';
import hoverMenuReducer from './hoverMenuSlice'
import stockReducer from './stockSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        hoverMenu: hoverMenuReducer,
        stocks: stockReducer
    }
})