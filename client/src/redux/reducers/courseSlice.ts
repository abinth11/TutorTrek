import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  data: {
    courseId: "",
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId(state, action: PayloadAction<{ courseId: string }>) {
      state.data = {
        courseId: action.payload.courseId,
      };
    },
    clearCourseId(state) {
      state.data = {
        courseId: "",
      };
    },
  },
});

export const { setCourseId, clearCourseId } = courseSlice.actions;

export const selectCourseId = (state: RootState) => state.course.data.courseId;


export const courseReducer = courseSlice.reducer;
