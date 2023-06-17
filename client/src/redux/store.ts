import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./reducers/studentAuthSlice";
import { adminAuthReducer } from "./reducers/adminAuthSlice";


export const store = configureStore({
    reducer:{
       studentAuth:userAuthReducer,
       admin:adminAuthReducer
    }
})

export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch