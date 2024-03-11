import { configureStore } from '@reduxjs/toolkit';
import idsReducer from './slice.js';


export default configureStore({
    reducer: {
        data: idsReducer
    },
});
