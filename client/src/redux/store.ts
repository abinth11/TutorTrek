import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./reducers/studentAuthSlice";


export const store = configureStore({
    reducer:{
       studentAuth:userAuthReducer,
    }
})

export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch