import {configureStore} from '@reduxjs/toolkit';
import authslice from './features/authslice';

let store=configureStore({
    reducer:{
        auth:authslice
    }
})

export default store;