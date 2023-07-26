import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { courseReducer } from "./reducers/courseSlice";
import { studentReducer } from "./reducers/studentSlice";
import { helperReducer } from "./reducers/helperSlice";
import { instructorReducer } from "./reducers/instructorSlice";
import * as reduxThunk from "redux-thunk/extend-redux";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    student: studentReducer,
    instructor: instructorReducer,
    helper: helperReducer,
  },
});

export type State = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
