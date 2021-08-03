
import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "../pages/slice/basketSlice";


export const store = configureStore({
    reducer:{
        basket: basketSlice,
    },
});