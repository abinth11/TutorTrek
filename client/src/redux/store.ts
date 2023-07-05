import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { adminAuthReducer } from "./reducers/adminAuthSlice";
import { courseReducer } from "./reducers/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminAuthReducer,
    course:courseReducer
  },
});

export type State = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
