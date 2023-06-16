import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./reducers/studentAuthSlice";
import { AdminReducer } from "./reducers/AdminSlice";


export const store = configureStore({
    reducer:{
       studentAuth:userAuthReducer,
       admin:AdminReducer
    }
})

export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch