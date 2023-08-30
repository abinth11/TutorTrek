import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CourseInterface } from "../../types/course"; // Corrected import path

interface InitialState {
  course: CourseInterface | null;
}

const initialState: InitialState = {
  course: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse(state, action: PayloadAction<{ course: CourseInterface }>) {
      state.course = action.payload.course;
    },
    clearCourse(state) {
      state.course = null;
    },
  },
});

export const { setCourse, clearCourse } = courseSlice.actions; 

export const selectCourse = (state: RootState) => state.course.course

export const courseReducer = courseSlice.reducer;
